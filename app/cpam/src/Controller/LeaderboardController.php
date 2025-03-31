<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Service\ClassementService;
use App\Services\NavigationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class LeaderboardController extends AbstractController
{
    private $classementService;
    private $entityManager;

    // Injection des dépendances via le constructeur
    public function __construct(ClassementService $classementService, EntityManagerInterface $entityManager)
    {
        $this->classementService = $classementService;
        $this->entityManager = $entityManager;
    }

    /**
     * @Route("/leaderboard", name="app_leaderboard")
     */
    public function index(Request $request, NavigationService $navService): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        $utilisateur = $this->entityManager->getRepository(Utilisateur::class)->find($utilisateurId);

        $jeuId = $request->query->get('jeu_id'); // Récupérer l'ID du jeu depuis l'URL
        $scoreUser = null;

        $jeuId = 2;
        if ($utilisateurId) {
            if ($jeuId) {
                // Récupérer le score pour un jeu spécifique
                $scoreUser = $this->classementService->getScoreUtilisateur($jeuId, $utilisateurId);
                $classement = $this->classementService->getClassement($jeuId);
            } else {
                // Récupérer le score total de l'utilisateur
                $scoreUser = $this->classementService->getScoreTotalUtilisateur((int) $utilisateurId);
                $classement = $this->classementService->getClassementTotal();
            }
        }
        

        // Renvoyer la réponse avec le rendu de la vue
        return $this->render('leaderboard/index.html.twig', [
            'controller_name' => 'LeaderboardController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'leaderboard', // Indique la page active
            'utilisateur' => $utilisateur,
            'classement' => $classement,
            'scoreUser' => $scoreUser,
            'jeuId' => $jeuId,
        ]);
    }
}