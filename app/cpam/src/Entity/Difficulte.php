<?php

namespace App\Entity;

use App\Repository\DifficulteRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=DifficulteRepository::class)
 */
class Difficulte
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
    private $nomDifficulte;

    /**
     * @ORM\ManyToMany(targetEntity=Jeu::class, mappedBy="jeu_difficulte")
     */
    private $difficulte_jeu;

    public function __construct()
    {
        $this->difficulte_jeu = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomDifficulte(): ?string
    {
        return $this->nomDifficulte;
    }

    public function setNomDifficulte(string $nomDifficulte): self
    {
        $this->nomDifficulte = $nomDifficulte;

        return $this;
    }

    /**
     * @return Collection<int, Jeu>
     */
    public function getDifficulteJeu(): Collection
    {
        return $this->difficulte_jeu;
    }

    public function addDifficulteJeu(Jeu $difficulteJeu): self
    {
        if (!$this->difficulte_jeu->contains($difficulteJeu)) {
            $this->difficulte_jeu[] = $difficulteJeu;
            $difficulteJeu->addJeuDifficulte($this);
        }

        return $this;
    }

    public function removeDifficulteJeu(Jeu $difficulteJeu): self
    {
        if ($this->difficulte_jeu->removeElement($difficulteJeu)) {
            $difficulteJeu->removeJeuDifficulte($this);
        }

        return $this;
    }
}
