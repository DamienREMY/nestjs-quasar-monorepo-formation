export interface SearchCustomerByChronoClientDto {
  chronoClient: string
  codeFichierPartenaire: string,
}

export interface SearchCustomerDto {
  chronoClient?: string,
  codeFichierPartenaire: string,
  codePostal?: string,
  dateDerniereCommandeFrom?: Date,
  dateDerniereCommandeTo?: Date
  nom?: string,
  prenom?: string,
  ville?: string,
}

export interface CustomerSearchResultDto {
  chronoClient: string,
  codeFichierPartenaire: string,
  codePostal: string,
  dateDerniereCommande: Date
  nom: string,
  prenom: string,
  ville: string,
}

export interface CodeLabelResultDto {
  code: string,
  label: string
}

export interface OffreReferenceResultDto {
  codeCampagne: number,
  codeOffre: string,
  codeProduit: string,
  dateDerniereModification: Date,
  libelleOffre: string,
}

export class ClientDto {

  codeFichierPartenaire: string;
  chronoClient: string;
  prenom: string;
  nom: string;
  codePostal: string;
  ville: string;
  dateDerniereCommande: Date;

}

export class ProductDto {

code:string;
libelle:string;
commentaires:string;

}

export declare class OffreDto {
  code: string;
  libelle: string;
  codeProduit: string;
  dateDerniereModification: Date;
}

export class SearchProductDto {

  labelLike:string;
}
