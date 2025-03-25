<?php

namespace App\Services;

class JeuTaquinService
{
    public function getJeuTaquinItems(): array
    {
        return [
            "presentation" => "/jeu/taquin",
            "gameplay" => "/jeu/taquin_gameplay"
        ];
    }
}
