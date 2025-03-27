<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Services\JeuRamasseurService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface; 

class JeuRamasseurController extends AbstractController
{

    private $classementService;
    private $entityManager;
    public function __construct(ClassementService $classementService,EntityManagerInterface $entityManager)
    {
        $this->classementService = $classementService;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/jeu/ramasseur", name="app_jeu_ramasseur")
     */
    public function index(JeuRamasseurService $jeuRamasseurService): Response
    {
        return $this->render('jeu_ramasseur/index.html.twig', [
            'controller_name' => 'JeuRamasseurController',
            'gameItems' => $jeuRamasseurService->getJeuRamasseurItems(),
            'activeGame' => 'presentation', // Indique la page active
        ]);
    }

    /**
     * @Route("/jeu/ramasseur_gameplay", name="app_jeu_ramasseur_gameplay")
     */
    public function gameplay(Request $request,EntityManagerInterface $entityManager): Response
    {
        $jeuId = 5;
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);
        $classement = $this->classementService->getClassement(2);

        return $this->render('jeu_ramasseur/gameplay.html.twig', [
            'classement' => $classement,
            'utilisateur' => $utilisateur 
        ]);
    }
}
