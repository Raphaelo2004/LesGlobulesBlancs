<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use Symfony\Component\HttpFoundation\Request;
use App\Services\JeuTaquinService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface; 

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
        $classement = $this->classementService->getClassement(1);

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
    public function gameplay(Request $request,EntityManagerInterface $entityManager): Response
    {
        $jeuId = 1;
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);
        $classement = $this->classementService->getClassement($jeuId);

        return $this->render('jeu_taquin/gameplay.html.twig', [
            'classement' => $classement,
            'utilisateur' => $utilisateur,
        ]);
    }
}
