<?php

namespace App\Services;

class JeuNinjaService
{
    public function getJeuNinjaItems(): array
    {
        return [
            "presentation" => "/jeu/ninja",
            "gameplay" => "/jeu/ninja_gameplay"
        ];
    }
}
