import {
  LoggerService,
  PrismaService
} from '@formation/servers-lib/dist/services'

import {
  ProductDto,
  WorkDone,
} from '@formation/shared-lib'

import { Get, Injectable, Put } from '@nestjs/common'
import { words } from 'lodash'

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

}
