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

    public function getClassement(): array
    {
        // Requête DQL pour sommer les scores par utilisateur
        $query = $this->entityManager->createQuery(
            'SELECT u.identifiant, SUM(s.valeur) as totalScore
             FROM App\Entity\Score s
             JOIN s.score_utilisateur u
             GROUP BY u.identifiant
             ORDER BY totalScore DESC'
        );
    
        return $query->getResult();
    }
    
}
