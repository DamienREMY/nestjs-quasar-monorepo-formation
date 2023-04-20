import { LoggerService } from '@formation/servers-lib/dist/services'
import { AbstractController } from '@formation/servers-lib/dist/utils'

import {
  ProductDto,
  WorkDone
} from '@formation/shared-lib'

import {
  Controller,
  Get,
  Query
} from '@nestjs/common'

import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController extends AbstractController {

  constructor (
    private readonly logger: LoggerService,
    private readonly productsService: ProductsService
  ) {
    super()
    this.logger.info('ProductsController created')
  }

@Get('')
async getFirstToTenthProducts(): Promise<WorkDone<ProductDto[]>> {
  return this.productsService.getFirstToTenthProducts()
}

}
