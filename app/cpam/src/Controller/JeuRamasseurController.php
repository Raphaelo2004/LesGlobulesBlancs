<?php

namespace App\Controller;

use App\Services\JeuRamasseurService;
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
    public function index(JeuRamasseurService $jeuRamasseurService): Response
    {
        // Récupérer le classement
        $classement = $this->classementService->getClassement();

        return $this->render('jeu_ramasseur/index.html.twig', [
            'controller_name' => 'JeuRamasseurController',
            'gameItems' => $jeuRamasseurService->getJeuRamasseurItems(),
            'activeGame' => 'presentation' // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/ramasseur_gameplay", name="app_jeu_ramasseur_gameplay")
     */
    public function gameplay(): Response
    {
        return $this->render('jeu_ramasseur/gameplay.html.twig');
    }
}
