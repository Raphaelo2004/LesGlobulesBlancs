<?php

namespace App\Entity;

use App\Repository\ScoreRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ScoreRepository::class)
 */
class Score
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer")
     */
    private $valeur;

    /**
     * @ORM\Column(type="float")
     */
    private $tempsRealise;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateScore;

    /**
     * @ORM\ManyToOne(targetEntity=Utilisateur::class, inversedBy="utilisateur_score")
     * @ORM\JoinColumn(nullable=false)
     */
    private $score_utilisateur;

    /**
     * @ORM\ManyToOne(targetEntity=Jeu::class, inversedBy="jeu_score")
     * @ORM\JoinColumn(nullable=false)
     */
    private $score_jeu;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getValeur(): ?int
    {
        return $this->valeur;
    }

    public function setValeur(int $valeur): self
    {
        $this->valeur = $valeur;

        return $this;
    }

    public function getTempsRealise(): ?float
    {
        return $this->tempsRealise;
    }

    public function setTempsRealise(float $tempsRealise): self
    {
        $this->tempsRealise = $tempsRealise;

        return $this;
    }

    public function getDateScore(): ?\DateTimeInterface
    {
        return $this->dateScore;
    }

    public function setDateScore(\DateTimeInterface $dateScore): self
    {
        $this->dateScore = $dateScore;

        return $this;
    }

    public function getScoreUtilisateur(): ?Utilisateur
    {
        return $this->score_utilisateur;
    }

    public function setScoreUtilisateur(?Utilisateur $score_utilisateur): self
    {
        $this->score_utilisateur = $score_utilisateur;

        return $this;
    }

    public function getScoreJeu(): ?Jeu
    {
        return $this->score_jeu;
    }

    public function setScoreJeu(?Jeu $score_jeu): self
    {
        $this->score_jeu = $score_jeu;

        return $this;
    }
}
