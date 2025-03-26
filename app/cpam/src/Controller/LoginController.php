<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Form\Connexion2Type;
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

        if ($form->isSubmitted() && $form->isValid()) {
            // Récupère les infos du formulaire
            $identifiantSaisi = $utilisateurFormData->getIdentifiant();
            $emailSaisi = $utilisateurFormData->getEmail();

            // Recherche en base un utilisateur correspondant
            $utilisateurEnBase = $entityManager
                ->getRepository(Utilisateur::class)
                ->findOneBy([
                    'identifiant' => $identifiantSaisi,
                    'email' => $emailSaisi,
                ]);

            if ($utilisateurEnBase) {
                // Utilisateur trouvé : stocke son ID en session et redirige vers l'accueil
                $session->set('utilisateur_id', $utilisateurEnBase->getId());
                return $this->redirectToRoute('app_accueil');
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
