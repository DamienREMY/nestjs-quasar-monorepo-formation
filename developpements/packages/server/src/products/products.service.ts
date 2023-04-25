import {
  LoggerService,
  PrismaService
} from '@formation/servers-lib/dist/services'

import {
  ProductDto,
  WorkDone,
} from '@formation/shared-lib'

import { Delete, Get, Injectable, Post, Put } from '@nestjs/common'

@Injectable()
export class ProductsService {

  constructor (
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {
    this.logger.info('ProductsService created')
  }

@Get('')
async getFirstToTenthProducts(): Promise<WorkDone<ProductDto[]>> {

  try{
  const dbProducts = await this.prismaService.produit.findMany(

    {
      take: 10,
      orderBy:{

        code : 'asc'
      }
    })
    return WorkDone.buildOk(dbProducts)

  }
  catch(e){return WorkDone.buildError("Erreur dans la sélection des 10 produits")}
}

@Get('/:code')
async getSingleProduct(code: string): Promise<WorkDone<ProductDto>> {

  try{
  const dbProduct = await this.prismaService.produit.findUnique(

    {
      where:{
        code: code
      }
    }
  )

  if(!dbProduct){return WorkDone.buildError("Code introuvable dans la base de données")}

  return WorkDone.buildOk(dbProduct)
}catch(e){return WorkDone.buildError("Erreur dans la sélection du produit")}
  
}

@Get('/filter')
async queryProductfromLibelle(libelle: string): Promise<WorkDone<ProductDto[]>> {

  try{
    const dbProduct = await this.prismaService.produit.findMany(

      {
        where:{
          libelle:{
            startsWith:libelle
          }
        },
        orderBy:{
          code: 'asc'
        }
      }
    )
    if(!dbProduct){return WorkDone.buildError("Pas de produit au libellé correspondant")}
    return WorkDone.buildOk(dbProduct)
  }catch(e){
    return WorkDone.buildError("Erreur dans la recherche produit")
  }
}





@Put('/:code')
async putLibelleProduct(code: string, product: ProductDto): Promise<WorkDone<ProductDto>> {

  const wd :WorkDone<ProductDto> = await this.getSingleProduct(code)
  if(!wd.isOk){
    return wd;
  }

  try{

    const dbProduct = await this.prismaService.produit.update({

      where:{
        code:code
      },
      data :{
        libelle:product.libelle
      }

    })

    return WorkDone.buildOk(dbProduct)

  }catch(e){
    return WorkDone.buildError("Erreur dans la modification du libellé")
  }

}

@Delete('/:code')
async deleteProduct(code: string): Promise<string> {

  if(!((await this.getSingleProduct(code)).isOk)){
    return "Aucun produit identifié avec ce code"
  }

  try{
    await this.prismaService.produit.delete({

      where: {code:code}
    })

  return "Suppression du produit réalisée"   
  }catch(e){

    return "Erreur dans la suppression du produit"
  }


}

@Post('')
async postProduct(product : ProductDto): Promise<WorkDone<ProductDto>> {

  if((await this.getSingleProduct(product.code)).isOk){
    return WorkDone.buildError("Le produit est déjà existant")
  }

  this.logger.info(`creating: ${JSON.stringify(product)}...`)
  const dbProduct = await this.prismaService.produit.create({
    data:product
  })

  if(!dbProduct){return WorkDone.buildError("Erreur dans la création du produit dans la base de données")}
  return WorkDone.buildOk(dbProduct)

}


}
