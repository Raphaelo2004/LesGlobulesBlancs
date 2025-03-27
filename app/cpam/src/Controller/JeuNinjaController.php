<?php

namespace App\Controller;

use App\Services\JeuNinjaService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuNinjaController extends AbstractController
{
    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/ninja", name="app_jeu_ninja")
     */
    public function index(JeuNinjaService $jeuNinjaService): Response
    {
        // Récupérer le classement
        $classement = $this->classementService->getClassement(4);

        return $this->render('jeu_ninja/index.html.twig', [
            'controller_name' => 'JeuNinjaController',
            'gameItems' => $jeuNinjaService->getJeuNinjaItems(),
            'activeGame' => 'presentation', // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/ninja_gameplay", name="app_jeu_ninja_gameplay")
     */
    public function gameplay(): Response
    {
        $classement = $this->classementService->getClassement(4);

        return $this->render('jeu_ninja/gameplay.html.twig', [
            'classement' => $classement
        ]);
    }
}