<?php
namespace App\Controller;

use App\Entity\Score;
use App\Entity\Utilisateur;
use App\Entity\Jeu;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

/**
 * @Route("/score", name="score_")
 */
class ScoreController extends AbstractController
{
    /**
     * @Route("/save_score", name="save_score", methods={"POST"})
     */
    public function saveScore(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        // Récupère les données envoyées par la requête
        $data = json_decode($request->getContent(), true);

        // On récupère la valeur du score
        $scoreValue = $data['score'] ?? null;

        // Valider les données
        if ($scoreValue === null) {
            return new JsonResponse(['error' => 'Score manquant'], JsonResponse::HTTP_BAD_REQUEST);
        }
        $session = $request->getSession();
        $utilisateurId = $session->get('utilisateur_id');
        // Trouver un utilisateur et un jeu par défaut ou selon tes besoins
        $user = $entityManager->getRepository(Utilisateur::class)->find($utilisateurId);  // Ici tu pourrais rechercher l'utilisateur autrement
        $game = $entityManager->getRepository(Jeu::class)->find($data['gameId']);  // Même chose pour le jeu

        if (!$game) {
            return new JsonResponse(['error' => 'jeu non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }

        if (!$user) {
            return new JsonResponse(['error' => 'Utilisateur non trouvé'], JsonResponse::HTTP_NOT_FOUND);
        }




        // Crée une nouvelle instance de Score
        $newScore = new Score();
        $newScore->setValeur($scoreValue);
        $newScore->setTempsRealise(0);  // Tu pourrais remplacer par une valeur par défaut
        $newScore->setDateScore(new \DateTime());  // Date du score = maintenant
        $newScore->setScoreUtilisateur($user);
        $newScore->setScoreJeu($game);

        // Enregistrer le score dans la base de données
        $entityManager->persist($newScore);
        $entityManager->flush();

        // Retourner une réponse JSON pour signaler le succès
        return new JsonResponse(['message' => 'Score enregistré avec succès'], JsonResponse::HTTP_OK);
    }

}
