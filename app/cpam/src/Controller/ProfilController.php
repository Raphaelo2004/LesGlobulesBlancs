<?php

namespace App\Controller;

use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfilController extends AbstractController
{
    /**
     * @Route("/profil", name="app_profil")
     */
    public function index(NavigationService $navService): Response
    {
        return $this->render('profil/index.html.twig', [
            'controller_name' => 'ProfilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil' // Indique la page active
        ]);
    }
}
