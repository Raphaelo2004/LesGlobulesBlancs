<?php

namespace App\Controller;

use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccueilController extends AbstractController
{
    /**
     * @Route("/accueil", name="app_accueil")
     */
    public function index(NavigationService $navService): Response
    {
        return $this->render('accueil/index.html.twig', [
            'controller_name' => 'AccueilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'home' // Indique la page active
        ]);
    }
}
