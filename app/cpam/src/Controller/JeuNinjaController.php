<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Services\JeuNinjaService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface; 

class JeuNinjaController extends AbstractController
{
    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/ninja", name="app_jeu_ninja")
     */
    public function index(Request $request, JeuNinjaService $jeuNinjaService): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        // Récupérer le classement
        $classement = $this->classementService->getClassement(4);

        return $this->render('jeu_ninja/index.html.twig', [
            'controller_name' => 'JeuNinjaController',
            'gameItems' => $jeuNinjaService->getJeuNinjaItems(),
            'activeGame' => 'presentation', // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/ninja_gameplay", name="app_jeu_ninja_gameplay")
     */
    public function gameplay(Request $request, EntityManagerInterface $entityManager): Response
    {

        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        $jeuId = 2;
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);
        $classement = $this->classementService->getClassement($jeuId);

        return $this->render('jeu_ninja/gameplay.html.twig', [
            'classement' => $classement,
            'utilisateur' => $utilisateur 
        ]);
    }
}