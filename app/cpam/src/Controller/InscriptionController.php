<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Entity\ZoneGeographique;
use App\Form\Register2FormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class InscriptionController extends AbstractController
{
    /**
     * @Route("/connexion", name="app_connexion")
     */
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
         // 1) Créer la nouvelle instance de l'entité Utilisateur
         $utilisateur = new Utilisateur();

         // 2) Créer le formulaire d'inscription
         $form = $this->createForm(Register2FormType::class, $utilisateur);

         // 3) Gérer la requête HTTP
         $form->handleRequest($request);

         // 4) Si le formulaire est soumis & valide
         if ($form->isSubmitted() && $form->isValid()) {

             // a) Récupérer l'ID de zone dans l'URL (GET)
             // Exemple d'URL : /connexion?zone=2
             $zoneId = $request->query->get('zone'); 
             // => $zoneId = "2" (string)

             // b) Vérifier si un paramètre zone a été fourni
             if ($zoneId) {
                 // On va chercher la zone correspondante
                 $zone = $entityManager->getRepository(ZoneGeographique::class)
                                       ->find($zoneId);

                 // c) Si la zone existe, on l'assigne à l'utilisateur
                 if ($zone) {
                     $utilisateur->setUtilisateurZoneGeographique($zone);
                 } else {
                     // Au cas où la zone n'existe pas
                     $this->addFlash('danger', 'Zone géographique invalide.');
                     // OU définir une zone par défaut, par exemple :
                     // $zoneDefault = $entityManager->getRepository(ZoneGeographique::class)->find(1);
                     // $utilisateur->setUtilisateurZoneGeographique($zoneDefault);
                 }
             } else {
                 // Si zone est obligatoire et non fournie,
                 // soit on gère l'erreur, soit on met une zone par défaut.
                 // $zoneDefault = $entityManager->getRepository(ZoneGeographique::class)->find(1);
                 // $utilisateur->setUtilisateurZoneGeographique($zoneDefault);
             }

             // Mettre le compteur de partage SMS à 0
             $utilisateur->setNbPartageSMS(0);

             // Définir la date de dernière connexion au moment de l'inscription
             $utilisateur->setDateDerniereConnexion(new \DateTime());

             // d) Persister l’utilisateur en base
             $entityManager->persist($utilisateur);
             $entityManager->flush();

             // e) Rediriger vers la page d'accueil (ou autre)
             return $this->redirectToRoute('app_accueil');
         }

         // 5) Afficher le formulaire
         return $this->render('inscription/index.html.twig', [
             'form' => $form->createView(),
         ]);
    }
}
