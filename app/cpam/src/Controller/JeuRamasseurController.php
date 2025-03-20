<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class JeuRamasseurController extends AbstractController
{
    /**
     * @Route("/jeu/ramasseur", name="app_jeu_ramasseur")
     */
    public function index(): Response
    {
        return $this->render('jeu_ramasseur/index.html.twig', [
            'controller_name' => 'JeuRamasseurController',
        ]);
    }
}
