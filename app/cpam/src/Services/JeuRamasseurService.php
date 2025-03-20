<?php

namespace App\Services;

class JeuRamasseurService
{
    public function getJeuRamasseurItems(): array
    {
        return [
            "presentation" => "/jeu/ramasseur",
            "gameplay" => "/jeu/ramasseur_gameplay"
        ];
    }
}
