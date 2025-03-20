<?php

namespace App\Controller;

use App\Services\JeuRamasseurService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuRamasseurController extends AbstractController
{
    /**
     * @Route("/jeu/ramasseur", name="app_jeu_ramasseur")
     */
    public function index(JeuRamasseurService $jeuRamasseurService): Response
    {
        return $this->render('jeu_ramasseur/index.html.twig', [
            'controller_name' => 'JeuRamasseurController',
            'gameItems' => $jeuRamasseurService->getJeuRamasseurItems(),
            'activeGame' => 'presentation' // Indique la page active
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
