<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250318144843 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE game_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE difficulte_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE jeu_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE score_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE utilisateur_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE zone_geographique_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE difficulte (id INT NOT NULL, nom_difficulte VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE jeu (id INT NOT NULL, nom_jeu VARCHAR(255) NOT NULL, duree_max DOUBLE PRECISION NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE jeu_difficulte (jeu_id INT NOT NULL, difficulte_id INT NOT NULL, PRIMARY KEY(jeu_id, difficulte_id))');
        $this->addSql('CREATE INDEX IDX_87C2C1E88C9E392E ON jeu_difficulte (jeu_id)');
        $this->addSql('CREATE INDEX IDX_87C2C1E8E6357589 ON jeu_difficulte (difficulte_id)');
        $this->addSql('CREATE TABLE score (id INT NOT NULL, score_utilisateur_id INT NOT NULL, score_jeu_id INT NOT NULL, valeur INT NOT NULL, temps_realise DOUBLE PRECISION NOT NULL, date_score TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_32993751B5624CD0 ON score (score_utilisateur_id)');
        $this->addSql('CREATE INDEX IDX_329937516F447EF0 ON score (score_jeu_id)');
        $this->addSql('CREATE TABLE utilisateur (id INT NOT NULL, utilisateur_zone_geographique_id INT NOT NULL, identifiant VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, date_derniere_connexion TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, nb_partage_sms INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_1D1C63B3B3357F7C ON utilisateur (utilisateur_zone_geographique_id)');
        $this->addSql('CREATE TABLE zone_geographique (id INT NOT NULL, nom_zone VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('ALTER TABLE jeu_difficulte ADD CONSTRAINT FK_87C2C1E88C9E392E FOREIGN KEY (jeu_id) REFERENCES jeu (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE jeu_difficulte ADD CONSTRAINT FK_87C2C1E8E6357589 FOREIGN KEY (difficulte_id) REFERENCES difficulte (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE score ADD CONSTRAINT FK_32993751B5624CD0 FOREIGN KEY (score_utilisateur_id) REFERENCES utilisateur (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE score ADD CONSTRAINT FK_329937516F447EF0 FOREIGN KEY (score_jeu_id) REFERENCES jeu (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE utilisateur ADD CONSTRAINT FK_1D1C63B3B3357F7C FOREIGN KEY (utilisateur_zone_geographique_id) REFERENCES zone_geographique (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('DROP TABLE game');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE jeu_difficulte DROP CONSTRAINT FK_87C2C1E8E6357589');
        $this->addSql('ALTER TABLE jeu_difficulte DROP CONSTRAINT FK_87C2C1E88C9E392E');
        $this->addSql('ALTER TABLE score DROP CONSTRAINT FK_329937516F447EF0');
        $this->addSql('ALTER TABLE score DROP CONSTRAINT FK_32993751B5624CD0');
        $this->addSql('ALTER TABLE utilisateur DROP CONSTRAINT FK_1D1C63B3B3357F7C');
        $this->addSql('DROP SEQUENCE difficulte_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE jeu_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE score_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE utilisateur_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE zone_geographique_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE game_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE game (id INT NOT NULL, title VARCHAR(255) NOT NULL, description VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('DROP TABLE difficulte');
        $this->addSql('DROP TABLE jeu');
        $this->addSql('DROP TABLE jeu_difficulte');
        $this->addSql('DROP TABLE score');
        $this->addSql('DROP TABLE utilisateur');
        $this->addSql('DROP TABLE zone_geographique');
    }
}
