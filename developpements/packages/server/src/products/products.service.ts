import {
  LoggerService,
  PrismaService
} from '@formation/servers-lib/dist/services'

import {
  ProductDto,
  WorkDone,
} from '@formation/shared-lib'

import { Get, Injectable } from '@nestjs/common'

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

}
