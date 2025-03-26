<?php

namespace App\Controller;

use App\Services\JeuDinoService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuDinoController extends AbstractController
{

    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/dino", name="app_jeu_dino_gameplay")
     */
    public function index(JeuDinoService $jeuDinoService): Response
    {
        // Récupérer le classement
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_dino/index.html.twig', [
            'controller_name' => 'JeuDinoController',
            'gameItems' => $jeuDinoService->getJeuDinoItems(),
            'activeGame' => 'presentation', // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/dino_gameplay", name="app_jeu_dino_gameplay")
     */
    public function gameplay(): Response
    {
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_dino/gameplay.html.twig', [
            'classement' => $classement
        ]);
    }
}
