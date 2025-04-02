<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;

class AccueilController extends AbstractController
{
    /**
     * @Route("/accueil", name="app_accueil")
     */
    public function index(Request $request, NavigationService $navService, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }
        
        // Récupérer l'objet utilisateur depuis la base de données
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);

        if (!$utilisateur) {
            return $this->redirectToRoute('app_connexion2');
        }

        // Vérifier si c'est un admin
        if ($utilisateur->getIsAdmin()) {
            return $this->redirectToRoute('app_admin');
        }

        return $this->render('accueil/index.html.twig', [
            'controller_name' => 'AccueilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'home' // Indique la page active
        ]);
    }

    /**
     * @Route("/tableau", name="app_tableau")
     */
    public function tableau_jeux(NavigationService $navService): Response
    {
        return $this->render('accueil/tableau.html.twig', [
            'controller_name' => 'AccueilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'home' // Indique la page active
        ]);
    }

}
