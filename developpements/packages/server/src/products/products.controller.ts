import { LoggerService } from '@formation/servers-lib/dist/services'
import { AbstractController } from '@formation/servers-lib/dist/utils'

import {
  ProductDto,
  WorkDone
} from '@formation/shared-lib'

import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post
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

@Get('/:code')
async getSingleProduct(@Param('code') code:string):Promise<WorkDone<ProductDto>> {
  return this.productsService.getSingleProduct(code)
}

@Put('/:code')
async putLibelleProduct(@Param('code') code:string, @Body() product: ProductDto ):Promise<WorkDone<ProductDto>> {
  return this.productsService.putLibelleProduct(code, product)
}

@Delete('/:code')
async deleteProduct(@Param('code') code:string): Promise<string> {

  return this.productsService.deleteProduct(code)
}

@Post('')
async postProduct(@Body() product:ProductDto): Promise<WorkDone<ProductDto>>{

  return this.productsService.postProduct(product)

}
}
