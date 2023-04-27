-- Active: 1682432773348@@localhost@45432@formation@public
CREATE TABLE ref_clients (
    codeFichierPartenaire VARCHAR(50) ,
    chronoClient VARCHAR(50),
    prenom VARCHAR(50),
    nom VARCHAR(50),
    codePostal VARCHAR(20),
    ville VARCHAR(50),
    dateDerniereCommande DATE,
    PRIMARY KEY(codeFichierPartenaire)
);

INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP001', 'CC001', 'Alice', 'Smith', '75001', 'Paris', '2021-01-10');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP002', 'CC002', 'Bob', 'Johnson', '10001', 'New York', '2021-02-15');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP003', 'CC003', 'Charlie', 'Garcia', '90210', 'Beverly Hills', '2021-03-20');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP004', 'CC004', 'David', 'Lee', '90001', 'Los Angeles', '2021-04-25');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP005', 'CC005', 'Evelyn', 'Miller', '60601', 'Chicago', '2021-05-30');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP006', 'CC006', 'Frank', 'Davis', '30301', 'Atlanta', '2021-06-05');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP007', 'CC007', 'Grace', 'Wilson', '98101', 'Seattle', '2021-07-10');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP008', 'CC008', 'Henry', 'Clark', '77001', 'Houston', '2021-08-15');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP009', 'CC009', 'Isabella', 'Taylor', '33101', 'Miami', '2021-09-20');
INSERT INTO ref_clients (codeFichierPartenaire, chronoClient, prenom, nom, codePostal, ville, dateDerniereCommande) VALUES ('CFP010', 'CC010', 'John', 'Brown', '90210', 'Beverly Hills', '2021-10-25');
