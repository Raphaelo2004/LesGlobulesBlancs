<?php

namespace App\Services;

class NavigationService
{
    public function getNavigationItems(): array
    {
        return [
            "home" => "/accueil",
            "leaderboard" => "/leaderboard",
            "profil" => "/profil"
        ];
    }
}
