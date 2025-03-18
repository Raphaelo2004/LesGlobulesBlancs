<?php

namespace App\Entity;

use App\Repository\JeuRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=JeuRepository::class)
 */
class Jeu
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $nomJeu;

    /**
     * @ORM\Column(type="float")
     */
    private $dureeMax;

    /**
     * @ORM\OneToMany(targetEntity=Score::class, mappedBy="score_jeu", orphanRemoval=true)
     */
    private $jeu_score;

    /**
     * @ORM\ManyToMany(targetEntity=Difficulte::class, inversedBy="difficulte_jeu")
     */
    private $jeu_difficulte;

    public function __construct()
    {
        $this->jeu_score = new ArrayCollection();
        $this->jeu_difficulte = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomJeu(): ?string
    {
        return $this->nomJeu;
    }

    public function setNomJeu(string $nomJeu): self
    {
        $this->nomJeu = $nomJeu;

        return $this;
    }

    public function getDureeMax(): ?float
    {
        return $this->dureeMax;
    }

    public function setDureeMax(float $dureeMax): self
    {
        $this->dureeMax = $dureeMax;

        return $this;
    }

    /**
     * @return Collection<int, Score>
     */
    public function getJeuScore(): Collection
    {
        return $this->jeu_score;
    }

    public function addJeuScore(Score $jeuScore): self
    {
        if (!$this->jeu_score->contains($jeuScore)) {
            $this->jeu_score[] = $jeuScore;
            $jeuScore->setScoreJeu($this);
        }

        return $this;
    }

    public function removeJeuScore(Score $jeuScore): self
    {
        if ($this->jeu_score->removeElement($jeuScore)) {
            // set the owning side to null (unless already changed)
            if ($jeuScore->getScoreJeu() === $this) {
                $jeuScore->setScoreJeu(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Difficulte>
     */
    public function getJeuDifficulte(): Collection
    {
        return $this->jeu_difficulte;
    }

    public function addJeuDifficulte(Difficulte $jeuDifficulte): self
    {
        if (!$this->jeu_difficulte->contains($jeuDifficulte)) {
            $this->jeu_difficulte[] = $jeuDifficulte;
        }

        return $this;
    }

    public function removeJeuDifficulte(Difficulte $jeuDifficulte): self
    {
        $this->jeu_difficulte->removeElement($jeuDifficulte);

        return $this;
    }
}
