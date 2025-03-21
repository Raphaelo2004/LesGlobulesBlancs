<?php

namespace App\Services;

class JeuNettoyageService
{
    public function getJeuNettoyageItems(): array
    {
        return [
            "presentation" => "/jeu/nettoyage",
            "gameplay" => "/jeu/nettoyage_gameplay"
        ];
    }
}
