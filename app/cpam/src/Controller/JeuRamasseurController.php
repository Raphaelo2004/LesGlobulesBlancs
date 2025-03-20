<?php

namespace App\Controller;

use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuRamasseurController extends AbstractController
{

    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/ramasseur", name="app_jeu_ramasseur")
     */
    public function index(): Response
    {
        // Récupérer le classement
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_ramasseur/index.html.twig', [
            'controller_name' => 'JeuRamasseurController',
            'classement' => $classement, 
        ]);
    }
}
