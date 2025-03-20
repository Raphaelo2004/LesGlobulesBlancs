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
        // Crée une requête DQL pour récupérer les scores et utilisateurs
        $query = $this->entityManager->createQuery(
            'SELECT s, u 
             FROM App\Entity\Score s 
             JOIN s.score_utilisateur u 
             ORDER BY s.valeur DESC'
        );
        
        // Exécute la requête et retourne les résultats
        return $query->getResult();
    }
}
