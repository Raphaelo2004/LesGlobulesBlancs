<?php

namespace App\Controller;

use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AccessibiliteController extends AbstractController
{
    /**
     * @Route("/accessibilite", name="app_accessibilite")
     */
    public function index(NavigationService $navService): Response
    {
        return $this->render('accessibilite/index.html.twig', [
            'controller_name' => 'AccessibiliteController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil' // Indique la page active
        ]);
    }
}
