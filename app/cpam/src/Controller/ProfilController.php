<?php

namespace App\Controller;

use App\Services\NavigationService;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Utilisateur;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProfilController extends AbstractController
{
    /**
     * @Route("/profil", name="app_profil")
     */
    public function index(Request $request, NavigationService $navService, EntityManagerInterface $entityManager): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        // Récupérer l'utilisateur depuis la base de données
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);

        return $this->render('profil/index.html.twig', [
            'controller_name' => 'ProfilController',
            'navItems' => $navService->getNavigationItems(),
            'activeNav' => 'profil', // Indique la page active
            'isAdmin' => $utilisateur ? $utilisateur->getIsAdmin() : false
        ]);
    }
}
