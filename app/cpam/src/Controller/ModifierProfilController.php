<?php

namespace App\Controller;

use App\Services\NavigationService;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ModifierProfilController extends AbstractController
{
    /**
     * @Route("/modifier/profil", name="app_modifier_profil")
     */
    public function index(Request $request, NavigationService $navService, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        // Récupérer l'utilisateur en base de données
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);

        return $this->render('modifier_profil/index.html.twig', [
            'controller_name' => 'ModifierProfilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil', // Indique la page active
            'identifiant' => $utilisateur ? $utilisateur->getIdentifiant() : '',
            'email' => $utilisateur ? $utilisateur->getEmail() : ''
        ]);
    }

    /**
     * @Route("/modifier/profil/traitement", name="app_modifier_profil_traitement", methods={"POST"})
     */
    public function modifierProfil(Request $request, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        // Récupérer l'utilisateur en base
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);

        if (!$utilisateur) {
            $this->addFlash('danger', 'Utilisateur non trouvé.');
            return $this->redirectToRoute('app_modifier_profil');
        }

        // Récupérer les nouvelles valeurs du formulaire
        $nouvelIdentifiant = $request->request->get('identifiant');
        $nouvelEmail = $request->request->get('email');

        // Mettre à jour l'utilisateur
        $utilisateur->setIdentifiant($nouvelIdentifiant);
        $utilisateur->setEmail($nouvelEmail);
        
        // Enregistrer en base
        $entityManager->flush();

        // Mettre à jour la session avec les nouvelles données
        $session->set('identifiant', $nouvelIdentifiant);
        $session->set('email', $nouvelEmail);

        // Ajouter un message de succès
        $this->addFlash('success', 'Profil mis à jour avec succès.');

        // Rediriger vers la page de profil
        return $this->redirectToRoute('app_modifier_profil');
    }

    /**
     * @Route("/deconnexion", name="app_deconnexion")
     */
    public function deconnexion(Request $request): Response
    {
        $session = $request->getSession();
        $session->invalidate(); // Supprime toutes les données de session

        // Supprime le cookie de session pour éviter qu'il ne persiste
        $response = $this->redirectToRoute('app_connexion2');
        $response->headers->clearCookie('PHPSESSID');

        $this->addFlash('success', 'Vous avez été déconnecté avec succès.');
        
        return $response;
    }


}
