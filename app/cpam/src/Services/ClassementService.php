<?php

namespace App\Service;

use Doctrine\ORM\EntityManagerInterface;

class ClassementService
{
    private $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function getClassement(int $jeuId): array
    {
        // Récupérer les meilleurs scores par utilisateur
        $query = $this->entityManager->createQuery(
            'SELECT 
                u.id,
                u.identifiant,
                j.id AS gameId, 
                MAX(s.valeur) AS maxScore
            FROM App\Entity\Score s
            JOIN s.score_utilisateur u
            JOIN s.score_jeu j
            WHERE j.id = :jeuId
            GROUP BY u.id,u.identifiant,j.id'
        )->setParameter('jeuId', $jeuId);        
        $results = $query->getResult();
        
        $totalScore = [];
        
        foreach ($results as $result) {
            // Si l'ID de l'utilisateur n'est pas encore dans $totalScore, on l'ajoute avec un tableau vide
            if (!isset($totalScore[$result['id']])) {
                $totalScore[$result['id']] = [
                    'id' => $result['id'],
                    'identifiant' => $result['identifiant'],
                    'MaxscoreJeu' => 0 // Initialisation du score total pour cet utilisateur
                ];
            }
        
            // Ajout du maxScore à totalScore (on additionne les scores pour chaque utilisateur)
            $totalScore[$result['id']]['MaxscoreJeu'] += $result['maxScore'];
        }
        
        // Tri par score total, du plus élevé au plus bas
        usort($totalScore, function ($a, $b) {
            return $b['MaxscoreJeu'] <=> $a['MaxscoreJeu'];
        });
        
        // Réindexer les clés pour que les indices commencent à 0
        $totalScore = array_values($totalScore);
        
        return $totalScore;
    }

    public function getClassementTotal(): array
    {
       // Récupérer les meilleurs scores par utilisateur
       $query = $this->entityManager->createQuery(
        'SELECT 
            u.id,
            u.identifiant,
            j.id AS gameId, 
            MAX(s.valeur) AS maxScore
        FROM App\Entity\Score s
        JOIN s.score_utilisateur u
        JOIN s.score_jeu j
        GROUP BY u.id,u.identifiant,j.id'
    );
    
    $results = $query->getResult();
    
    $totalScore = [];
    
    foreach ($results as $result) {
        // Si l'ID de l'utilisateur n'est pas encore dans $totalScore, on l'ajoute avec un tableau vide
        if (!isset($totalScore[$result['id']])) {
            $totalScore[$result['id']] = [
                'id' => $result['id'],
                'identifiant' => $result['identifiant'],
                'MaxscoreJeu' => 0 // Initialisation du score total pour cet utilisateur
            ];
        }
    
        // Ajout du maxScore à totalScore (on additionne les scores pour chaque utilisateur)
        $totalScore[$result['id']]['MaxscoreJeu'] += $result['maxScore'];
    }
    
    // Tri par score total, du plus élevé au plus bas
    usort($totalScore, function ($a, $b) {
        return $b['MaxscoreJeu'] <=> $a['MaxscoreJeu'];
    });
    
    // Réindexer les clés pour que les indices commencent à 0
    $totalScore = array_values($totalScore);
    
    return $totalScore;
    }
        

    public function getScoreUtilisateur(int $jeuId, int $utilisateurId): array
    {
        // Récupérer les meilleurs scores par utilisateur
        $query = $this->entityManager->createQuery(
            'SELECT 
                u.id,
                u.identifiant,
                j.id AS gameId, 
                MAX(s.valeur) AS maxScore
            FROM App\Entity\Score s
            JOIN s.score_utilisateur u
            JOIN s.score_jeu j
            WHERE j.id = :jeuId
            GROUP BY u.id, u.identifiant, j.id'
        )->setParameter('jeuId', $jeuId);

        $results = $query->getResult();
        
        $totalScores = [];

        // Calcul des scores totaux par utilisateur
        foreach ($results as $result) {
            if (!isset($totalScores[$result['id']])) {
                $totalScores[$result['id']] = 0;
            }

            $totalScores[$result['id']] += $result['maxScore'];
        }

        // Trier par score total (du plus élevé au plus bas)
        arsort($totalScores);

        // Trouver la position de l'utilisateur
        $position = array_search($utilisateurId, array_keys($totalScores)) + 1;
        $scoreUtilisateur = $totalScores[$utilisateurId] ?? 0;

        return [
            'score' => $scoreUtilisateur,
            'position' => $position
        ];
    }
    

    public function getScoreTotalUtilisateur(int $utilisateurId): array
    {
        // Récupérer les meilleurs scores par utilisateur
        $query = $this->entityManager->createQuery(
            'SELECT 
                u.id,
                u.identifiant,
                j.id AS gameId, 
                MAX(s.valeur) AS maxScore
            FROM App\Entity\Score s
            JOIN s.score_utilisateur u
            JOIN s.score_jeu j
            GROUP BY u.id, u.identifiant, j.id'
        );

        $results = $query->getResult();
        
        $totalScores = [];

        // Calcul des scores totaux par utilisateur
        foreach ($results as $result) {
            if (!isset($totalScores[$result['id']])) {
                $totalScores[$result['id']] = 0;
            }

            $totalScores[$result['id']] += $result['maxScore'];
        }

        // Trier par score total (du plus élevé au plus bas)
        arsort($totalScores);

        // Trouver la position de l'utilisateur
        $position = array_search($utilisateurId, array_keys($totalScores)) + 1;
        $scoreUtilisateur = $totalScores[$utilisateurId] ?? 0;

        return [
            'score' => $scoreUtilisateur,
            'position' => $position
        ];
    } 

    
}
