<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Form\RegistrationFormType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LoginController extends AbstractController
{
    /**
     * @Route("/", name="app_connexion2")
     */
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        
        // Si la session contient déjà l'ID de l'utilisateur, rediriger vers l'accueil
        if ($session->has('utilisateur_id')) {
            return $this->redirectToRoute('app_accueil');
        }

        // Utiliser l'objet Utilisateur uniquement pour hydrater le formulaire
        $utilisateurFormData = new Utilisateur();

        // Création du formulaire à partir du type RegistrationFormType
        $form = $this->createForm(RegistrationFormType::class, $utilisateurFormData);
        $form->handleRequest($request);

        // 3) Vérification du formulaire
        if ($form->isSubmitted() && $form->isValid()) {
            // a) Récupère les champs saisis
            $identifiantSaisi = $utilisateurFormData->getIdentifiant();
            $emailSaisi       = $utilisateurFormData->getEmail();

            // b) Recherche l'utilisateur correspondant
            $utilisateurEnBase = $entityManager
                ->getRepository(Utilisateur::class)
                ->findOneBy([
                    'identifiant' => $identifiantSaisi,
                    'email'       => $emailSaisi,
                ]);

            // c) Si on trouve un utilisateur
            if ($utilisateurEnBase) {
                // (1) Mettre à jour la date de dernière connexion
                $utilisateurEnBase->setDateDerniereConnexion(new \DateTime());

                // (2) Enregistrer la modification en base
                $entityManager->flush();

                // (3) Stocker l'ID utilisateur en session
                $session->set('utilisateur_id', $utilisateurEnBase->getId());

                // (4) Vérifier si l'utilisateur est administrateur
                if ($utilisateurEnBase->getIsAdmin()) {
                    return $this->redirectToRoute('app_admin'); // Redirige vers la page admin
                } else {
                    return $this->redirectToRoute('app_accueil'); // Redirige vers la page utilisateur normal
                }
            } else {
                // Utilisateur non trouvé : affiche un message d'erreur
                $this->addFlash('danger', 'Identifiant ou e-mail incorrect.');
            }
        }

        // Rendu du template avec le formulaire
        return $this->render('login/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
