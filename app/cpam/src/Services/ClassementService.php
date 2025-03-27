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
        $query = $this->entityManager->createQuery(
            'SELECT u.id, u.identifiant, MAX(s.valeur) as MaxscoreJeu
             FROM App\Entity\Score s
             JOIN s.score_utilisateur u
             JOIN s.score_jeu j
             WHERE j.id = :jeuId
             GROUP BY u.identifiant,u.id
             ORDER BY MaxscoreJeu DESC'
        )->setParameter('jeuId', $jeuId);
    
        return $query->getResult();
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
        

    public function getScoreUser(int $jeuId, int $utilisateurId): array
    {
        // Récupérer tous les scores des utilisateurs pour ce jeu, triés du plus grand au plus petit
        $query = $this->entityManager->createQuery(
            'SELECT u.id as utilisateurId, s.valeur as score
             FROM App\Entity\Score s
             JOIN s.score_utilisateur u
             WHERE s.score_jeu = :jeuId
             ORDER BY s.valeur DESC'
        )->setParameter('jeuId', $jeuId);
    
        $resultats = $query->getResult();
        $classement = 1;
    
        foreach ($resultats as $result) {
            if ($result['utilisateurId'] == $utilisateurId) {
                return [
                    'score' => $result['score'],
                    'position' => $classement
                ];
            }
            $classement++;
        }
    
        // Si l'utilisateur n'a pas de score, il est classé dernier avec 0 point
        return [
            'score' => 0,
            'position' => $classement
        ];
    }
    

    public function getScoreTotalUtilisateur(int $utilisateurId): array
    {
        // Récupérer les scores totaux de chaque utilisateur, triés du plus grand au plus petit
        $query = $this->entityManager->createQuery(
            'SELECT u.id, u.identifiant, SUM(s.valeur) as totalScore
            FROM App\Entity\Score s
            JOIN s.score_utilisateur u
            GROUP BY u.id, u.identifiant
            ORDER BY totalScore DESC'
        );

        $resultats = $query->getResult();
        $classement = 1;

        foreach ($resultats as $result) {
            if ($result['id'] == $utilisateurId) {
                return [
                    'score' => $result['totalScore'],
                    'position' => $classement
                ];
            }
            $classement++;
        }

        // Si l'utilisateur n'a pas de score, il est classé dernier avec 0 point
        return [
            'score' => 0,
            'position' => $classement
        ];
    }   

    
}
