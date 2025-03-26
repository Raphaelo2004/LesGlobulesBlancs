<?php

namespace App\Controller;

use App\Services\JeuNettoyageService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuNettoyageController extends AbstractController
{

    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/nettoyage", name="app_jeu_nettoyage")
     */
    public function index(JeuNettoyageService $jeuNettoyageService): Response
    {
        // Récupérer le classement
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_nettoyage/index.html.twig', [
            'controller_name' => 'JeuNettoyageController',
            'gameItems' => $jeuNettoyageService->getJeuNettoyageItems(),
            'activeGame' => 'presentation', // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/nettoyage_gameplay", name="app_jeu_nettoyage_gameplay")
     */
    public function gameplay(): Response
    {
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_nettoyage/gameplay.html.twig', [
            'classement' => $classement
        ]);
    }
}
