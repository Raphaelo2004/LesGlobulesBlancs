<?php

namespace App\Entity;

use App\Repository\UtilisateurRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=UtilisateurRepository::class)
 */
class Utilisateur
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
    private $identifiant;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateDerniereConnexion;

    /**
     * @ORM\Column(type="integer")
     */
    private $nbPartageSMS;

    /**
     * @ORM\ManyToOne(targetEntity=ZoneGeographique::class, inversedBy="zoneGeographique_utilisateur")
     * @ORM\JoinColumn(nullable=false)
     */
    private $utilisateur_zoneGeographique;

    /**
     * @ORM\OneToMany(targetEntity=Score::class, mappedBy="score_utilisateur", orphanRemoval=true)
     */
    private $utilisateur_score;

    public function __construct()
    {
        $this->utilisateur_score = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdentifiant(): ?string
    {
        return $this->identifiant;
    }

    public function setIdentifiant(string $identifiant): self
    {
        $this->identifiant = $identifiant;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getDateDerniereConnexion(): ?\DateTimeInterface
    {
        return $this->dateDerniereConnexion;
    }

    public function setDateDerniereConnexion(?\DateTimeInterface $dateDerniereConnexion): self
    {
        $this->dateDerniereConnexion = $dateDerniereConnexion;

        return $this;
    }

    public function getNbPartageSMS(): ?int
    {
        return $this->nbPartageSMS;
    }

    public function setNbPartageSMS(int $nbPartageSMS): self
    {
        $this->nbPartageSMS = $nbPartageSMS;

        return $this;
    }

    public function getUtilisateurZoneGeographique(): ?ZoneGeographique
    {
        return $this->utilisateur_zoneGeographique;
    }

    public function setUtilisateurZoneGeographique(?ZoneGeographique $utilisateur_zoneGeographique): self
    {
        $this->utilisateur_zoneGeographique = $utilisateur_zoneGeographique;

        return $this;
    }

    /**
     * @return Collection<int, Score>
     */
    public function getUtilisateurScore(): Collection
    {
        return $this->utilisateur_score;
    }

    public function addUtilisateurScore(Score $utilisateurScore): self
    {
        if (!$this->utilisateur_score->contains($utilisateurScore)) {
            $this->utilisateur_score[] = $utilisateurScore;
            $utilisateurScore->setScoreUtilisateur($this);
        }

        return $this;
    }

    public function removeUtilisateurScore(Score $utilisateurScore): self
    {
        if ($this->utilisateur_score->removeElement($utilisateurScore)) {
            // set the owning side to null (unless already changed)
            if ($utilisateurScore->getScoreUtilisateur() === $this) {
                $utilisateurScore->setScoreUtilisateur(null);
            }
        }

        return $this;
    }
}
