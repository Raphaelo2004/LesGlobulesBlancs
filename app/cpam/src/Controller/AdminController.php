<?php

namespace App\Controller;

use App\Services\NavigationService;
use App\Entity\Utilisateur;
use App\Entity\Score;
use App\Entity\Jeu;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractController
{
    /**
     * @Route("/admin", name="app_admin")
     */
    public function index(NavigationService $navService, Request $request, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);

        if (!$utilisateur || !$utilisateur->getIsAdmin()) {
            $this->addFlash('danger', 'Accès interdit.');
            return $this->redirectToRoute('app_profil');
        }

        // Récupérer tous les utilisateurs
        $utilisateurs = $entityManager->getRepository(Utilisateur::class)->findAll();

        // Récupérer le meilleur score de chaque utilisateur
        $meilleursScores = [];
        foreach ($utilisateurs as $user) {
            $meilleurScore = $entityManager->getRepository(Score::class)
                ->createQueryBuilder('s')
                ->select('MAX(s.valeur)')
                ->where('s.score_utilisateur = :user')
                ->setParameter('user', $user)
                ->getQuery()
                ->getSingleScalarResult();

            $meilleursScores[$user->getId()] = $meilleurScore ?? 0;
        }

        // Récupérer les statistiques des jeux (nombre de parties et nombre de joueurs par jeu)
        $gameStats = [];
        $jeux = $entityManager->getRepository(Jeu::class)->findAll(); // Récupère tous les jeux

        foreach ($jeux as $jeu) {
            // Nombre de parties jouées pour ce jeu
            $partiesJouees = $entityManager->getRepository(Score::class)
                ->createQueryBuilder('s')
                ->select('COUNT(s.id)')
                ->where('s.score_jeu = :jeu')
                ->setParameter('jeu', $jeu)
                ->getQuery()
                ->getSingleScalarResult();

            // Nombre de joueurs uniques ayant joué à ce jeu
            $joueursUnqiues = $entityManager->getRepository(Score::class)
                ->createQueryBuilder('s')
                ->select('COUNT(DISTINCT s.score_utilisateur)')
                ->where('s.score_jeu = :jeu')
                ->setParameter('jeu', $jeu)
                ->getQuery()
                ->getSingleScalarResult();

            $gameStats[] = [
                'jeu' => $jeu->getNomJeu(),
                'partiesJouees' => $partiesJouees,
                'joueursUnqiues' => $joueursUnqiues,
            ];
        }

        return $this->render('admin/index.html.twig', [
            'utilisateurs' => $utilisateurs,
            'meilleursScores' => $meilleursScores,
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil', // Indique la page active
            'isAdmin' => $utilisateur ? $utilisateur->getIsAdmin() : false,
            'gameStats' => $gameStats, // Passer les statistiques des jeux au template
        ]);
    }
}
