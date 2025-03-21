<?php

namespace App\Controller;

use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ConfidentialiteController extends AbstractController
{
    /**
     * @Route("/confidentialite", name="app_confidentialite")
     */
    public function index(NavigationService $navService): Response
    {
        return $this->render('confidentialite/index.html.twig', [
            'controller_name' => 'ConfidentialiteController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil' // Indique la page active
        ]);
    }
}
