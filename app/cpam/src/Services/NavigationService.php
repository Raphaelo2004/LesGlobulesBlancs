<?php

namespace App\Services;

class NavigationService
{
    public function getNavigationItems(): array
    {
        return [
            "home" => "/home",
            "leaderboard" => "/leaderboard",
            "profil" => "/profil"
        ];
    }
}
