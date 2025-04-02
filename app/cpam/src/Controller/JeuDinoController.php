<?php


namespace App\Controller;

use App\Entity\Jeu;
use App\Entity\Score;
use App\Entity\Utilisateur;
use App\Services\JeuDinoService;
use App\Service\ClassementService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ScoreRepository; 
use Doctrine\ORM\EntityManagerInterface; 


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
    public function index(JeuDinoService $jeuDinoService): Response
    {
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
    public function gameplay(Request $request,EntityManagerInterface $entityManager): Response
    {
        $jeuId = 3;
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        $utilisateur = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);
        $classement = $this->classementService->getClassement($jeuId);

        return $this->render('jeu_dino/gameplay.html.twig', [
            'classement' => $classement,
            'utilisateur' => $utilisateur

        ]);
    }
}
