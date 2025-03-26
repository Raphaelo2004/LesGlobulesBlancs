<?php

namespace App\Services;

class JeuDinoService
{
    public function getJeuDinoItems(): array
    {
        return [
            "presentation" => "/jeu/dino",
            "gameplay" => "/jeu/dino_gameplay"
        ];
    }
}
