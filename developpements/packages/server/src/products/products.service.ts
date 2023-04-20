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

  const dbProducts = await this.prismaService.produit.findMany(

    {
      take: 10,
      orderBy:{
        libelle : 'asc'
      }
    })
    return WorkDone.buildOk(dbProducts)
}

}
