<?php

namespace App\Entity;

use App\Repository\ZoneGeographiqueRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=ZoneGeographiqueRepository::class)
 */
class ZoneGeographique
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
    private $nomZone;

    /**
     * @ORM\OneToMany(targetEntity=Utilisateur::class, mappedBy="utilisateur_zoneGeographique", orphanRemoval=true)
     */
    private $zoneGeographique_utilisateur;

    public function __construct()
    {
        $this->zoneGeographique_utilisateur = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomZone(): ?string
    {
        return $this->nomZone;
    }

    public function setNomZone(string $nomZone): self
    {
        $this->nomZone = $nomZone;

        return $this;
    }

    /**
     * @return Collection<int, Utilisateur>
     */
    public function getZoneGeographiqueUtilisateur(): Collection
    {
        return $this->zoneGeographique_utilisateur;
    }

    public function addZoneGeographiqueUtilisateur(Utilisateur $zoneGeographiqueUtilisateur): self
    {
        if (!$this->zoneGeographique_utilisateur->contains($zoneGeographiqueUtilisateur)) {
            $this->zoneGeographique_utilisateur[] = $zoneGeographiqueUtilisateur;
            $zoneGeographiqueUtilisateur->setUtilisateurZoneGeographique($this);
        }

        return $this;
    }

    public function removeZoneGeographiqueUtilisateur(Utilisateur $zoneGeographiqueUtilisateur): self
    {
        if ($this->zoneGeographique_utilisateur->removeElement($zoneGeographiqueUtilisateur)) {
            // set the owning side to null (unless already changed)
            if ($zoneGeographiqueUtilisateur->getUtilisateurZoneGeographique() === $this) {
                $zoneGeographiqueUtilisateur->setUtilisateurZoneGeographique(null);
            }
        }

        return $this;
    }
}
