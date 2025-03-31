<?php

namespace App\Controller;

use App\Services\JeuDinoService;
use App\Service\ClassementService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

class JeuDinoController extends AbstractController
{

    private $classementService;
    public function __construct(ClassementService $classementService)
    {
        $this->classementService = $classementService;
    }

    /**
     * @Route("/jeu/dino", name="app_jeu_dino")
     */
    public function index(Request $request, JeuDinoService $jeuDinoService): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        // Récupérer le classement
        $classement = $this->classementService->getClassement(3);

        return $this->render('jeu_dino/index.html.twig', [
            'controller_name' => 'JeuDinoController',
            'gameItems' => $jeuDinoService->getJeuDinoItems(),
            'activeGame' => 'presentation', // Indique la page active
            'classement' => $classement, 
        ]);
    }

    /**
     * @Route("/jeu/dino_gameplay", name="app_jeu_dino_gameplay")
     */
    public function gameplay(Request $request): Response
    {
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');

        // Vérifier si l'utilisateur est bien connecté
        if (!$utilisateurId) {
            return $this->redirectToRoute('app_connexion2');
        }

        $classement = $this->classementService->getClassement(3);

        return $this->render('jeu_dino/gameplay.html.twig', [
            'classement' => $classement
        ]);
    }
}
