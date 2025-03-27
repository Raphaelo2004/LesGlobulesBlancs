<?php

namespace App\Controller;

use App\Entity\Jeu;
use App\Entity\Score;
use App\Entity\Utilisateur;
use App\Services\JeuNettoyageService;
use App\Service\ClassementService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ScoreRepository; 
use Doctrine\ORM\EntityManagerInterface; 


class JeuNettoyageController extends AbstractController
{
    private $classementService;
    private $entityManager;
    public function __construct(ClassementService $classementService,ScoreRepository $scoreRepository, EntityManagerInterface $entityManager)
    {
        $this->classementService = $classementService;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/jeu/nettoyage", name="app_jeu_nettoyage")
     */
    public function index(JeuNettoyageService $jeuNettoyageService): Response
    {
        return $this->render('jeu_nettoyage/index.html.twig', [
            'controller_name' => 'JeuNettoyageController',
            'gameItems' => $jeuNettoyageService->getJeuNettoyageItems(),
            'activeGame' => 'presentation', // Indique la page active
        ]);
    }

    /**
     * @Route("/jeu/nettoyage_gameplay", name="app_jeu_nettoyage_gameplay")
     */
    public function gameplay(Request $request,EntityManagerInterface $entityManager): Response
    {
        $jeuId = 5;
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);
        $classement = $this->classementService->getClassement($jeuId);

        return $this->render('jeu_nettoyage/gameplay.html.twig', [
            'classement' => $classement,
            'utilisateur' => $utilisateur,
        ]);
    }


}
