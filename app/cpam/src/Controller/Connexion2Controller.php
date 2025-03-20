<?php

namespace App\Controller;

use App\Entity\Utilisateur;
use App\Form\Connexion2Type;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class Connexion2Controller extends AbstractController
{
    /**
     * @Route("/", name="connexion2")
     */
    public function index(Request $request, EntityManagerInterface $entityManager): Response
    {
        // On utilise l'objet Utilisateur *uniquement* pour hydrater le formulaire
        $utilisateurFormData = new Utilisateur();

        // Création du formulaire à partir du type Connexion2Type
        $form = $this->createForm(Connexion2Type::class, $utilisateurFormData);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            // Récupère les infos du formulaire
            $identifiantSaisi = $utilisateurFormData->getIdentifiant();
            $emailSaisi = $utilisateurFormData->getEmail();

            // Recherche en base un utilisateur correspondant
            $utilisateurEnBase = $entityManager
                ->getRepository(Utilisateur::class)
                ->findOneBy([
                    'identifiant' => $identifiantSaisi,
                    'email' => $emailSaisi,
                ]);

            if ($utilisateurEnBase) {
                // Utilisateur trouvé : on le stocke en session
                $session = $request->getSession();
                // Tu peux stocker directement l'ID
                $session->set('utilisateur_id', $utilisateurEnBase->getId());

                // (Optionnel) Si tu veux stocker l’objet en entier, assure-toi qu’il est sérialisable
                // $session->set('utilisateur', $utilisateurEnBase);

                // Redirection vers la page d'accueil (ou autre)
                return $this->redirectToRoute('accueil');
            } else {
                // Alerte : identifiants invalides
                $this->addFlash('danger', 'Identifiant ou e-mail incorrect.');
            }
        }

        // Rendu du template
        return $this->render('connexion2/index.html.twig', [
            'form' => $form->createView(),
        ]);
    }
}
