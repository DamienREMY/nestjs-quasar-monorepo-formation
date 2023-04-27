import { LoggerService } from '@formation/servers-lib/dist/services';
import { AbstractController } from '@formation/servers-lib/dist/utils';

import { ProductDto, WorkDone, OffreDto, IPaginatedListDto } from '@formation/shared-lib';

import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Delete,
  Post,
  Query,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController extends AbstractController {
  constructor(
    private readonly logger: LoggerService,
    private readonly productsService: ProductsService,
  ) {
    super();
    this.logger.info('ProductsController created');
  }

  @Get('')
  async getProductsList(
    @Query('page') page: string,
  ): Promise<WorkDone<IPaginatedListDto<ProductDto>>> {
    return this.productsService.getProductsList(page);
  }

  @Get('all')
  async getAllProducts(): Promise<WorkDone<number>> {
    return this.productsService.getAllProducts();
  }

  @Get('filter')
  async queryProductfromLibelle(
    @Query('code') code: string,
    @Query('libelle') libelle: string = "",
  ): Promise<WorkDone<ProductDto[]>> {
    return this.productsService.queryProductfromLibelle(code,libelle);
  }

  @Get('offers')
  async getOffersFromProducts(@Body() products: ProductDto[]): Promise<WorkDone<OffreDto[]>> {
    return this.productsService.getOffersFromProducts(products)
  }

  @Get('/:code')
  async getSingleProduct(
    @Param('code') code: string,
  ): Promise<WorkDone<ProductDto>> {
    return this.productsService.getSingleProduct(code);
  }

  @Put('/:code')
  async putLibelleProduct(
    @Param('code') code: string,
    @Body() product: ProductDto,
  ): Promise<WorkDone<ProductDto>> {
    return this.productsService.putLibelleProduct(code, product);
  }

  @Delete('/:code')
  async deleteProduct(@Param('code') code: string): Promise<string> {
    return this.productsService.deleteProduct(code);
  }

  @Post('')
  async postProduct(
    @Body() product: ProductDto,
  ): Promise<WorkDone<ProductDto>> {
    return this.productsService.postProduct(product);
  }
}
