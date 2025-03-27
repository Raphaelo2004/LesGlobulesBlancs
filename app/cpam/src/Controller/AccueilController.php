<?php

namespace App\Controller;
use Symfony\Component\HttpFoundation\Request;
use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccueilController extends AbstractController
{
    /**
     * @Route("/accueil", name="app_accueil")
     */
    public function index(Request $request, NavigationService $navService): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
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
