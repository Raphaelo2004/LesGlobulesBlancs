<?php

namespace App\Controller;

use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ModifierProfilController extends AbstractController
{
    /**
     * @Route("/modifier/profil", name="app_modifier_profil")
     */
    public function index(NavigationService $navService): Response
    {
        return $this->render('modifier_profil/index.html.twig', [
            'controller_name' => 'ModifierProfilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil' // Indique la page active
        ]);
    }
}
