<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class JeuNonDisponibleController extends AbstractController
{
    /**
     * @Route("/jeu/non/disponible", name="app_jeu_non_disponible")
     */
    public function index(Request $request): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        return $this->render('jeu_non_disponible/index.html.twig', [
            'controller_name' => 'JeuNonDisponibleController',
        ]);
    }
}
