<?php

namespace App\Controller;

use App\Service\ClassementService;
use App\Services\NavigationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LeaderboardController extends AbstractController
{
    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/leaderboard", name="app_leaderboard")
     */
    public function index(NavigationService $navService): Response
    {
         // Récupérer le classement
         $classement = $this->classementService->getClassement();

        return $this->render('leaderboard/index.html.twig', [
            'controller_name' => 'LeaderboardController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'leaderboard', // Indique la page active
            'classement' => $classement, 
        ]);
    }
}
