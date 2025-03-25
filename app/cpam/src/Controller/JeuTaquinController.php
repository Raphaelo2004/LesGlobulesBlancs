<?php

namespace App\Controller;

use App\Services\JeuTaquinService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuTaquinController extends AbstractController
{
    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/taquin", name="app_jeu_taquin")
     */
    public function index(JeuTaquinService $jeuTaquinService): Response
    {
        // Récupérer le classement
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_taquin/index.html.twig', [
            'controller_name' => 'JeuTaquinController',
            'gameItems' => $jeuTaquinService->getJeuTaquinItems(),
            'activeGame' => 'presentation', // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/taquin_gameplay", name="app_jeu_taquin_gameplay")
     */
    public function gameplay(): Response
    {
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_taquin/gameplay.html.twig', [
            'classement' => $classement
        ]);
    }
}
