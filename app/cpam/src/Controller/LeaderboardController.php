<?php

namespace App\Controller;

use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LeaderboardController extends AbstractController
{
    /**
     * @Route("/leaderboard", name="app_leaderboard")
     */
    public function index(NavigationService $navService): Response
    {
        return $this->render('leaderboard/index.html.twig', [
            'controller_name' => 'LeaderboardController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'leaderboard' // Indique la page active
        ]);
    }
}
