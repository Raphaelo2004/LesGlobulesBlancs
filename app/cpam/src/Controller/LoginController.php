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
        // 1) On utilise un objet Utilisateur pour hydrater le formulaire
        $utilisateurFormData = new Utilisateur();

        // 2) Création du formulaire à partir de RegistrationFormType
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

                // (2) On enregistre la modification
                $entityManager->flush();

                // (3) Stocke l'ID utilisateur en session (ou l’objet, etc.)
                $session = $request->getSession();
                $session->set('utilisateur_id', $utilisateurEnBase->getId());

                // (4) Redirection vers la page d'accueil (ou autre)
                return $this->redirectToRoute('app_accueil');
            } else {
                // Utilisateur non trouvé : afficher un message d’erreur
                $this->addFlash('danger', 'Identifiant ou e-mail incorrect.');
            }
        }

        // 4) Afficher le formulaire
        return $this->render('login/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
