import { Offre } from '@formation/servers-lib/dist/.prisma/client';
import {
  LoggerService,
  PrismaService,
} from '@formation/servers-lib/dist/services';

import {OffreDto, ProductDto, WorkDone } from '@formation/shared-lib';

import {Injectable} from '@nestjs/common';

@Injectable()
export class ProductsService {
  constructor(
    private readonly logger: LoggerService,
    private readonly prismaService: PrismaService,
  ) {
    this.logger.info('ProductsService created');
  }

  // @Get('')
  async getFirstToTenthProducts(): Promise<WorkDone<ProductDto[]>> {
    try {
      const dbProducts = await this.prismaService.produit.findMany({
        take: 10,
        orderBy: {
          code: 'asc',
        },
      });

      return WorkDone.buildOk(dbProducts);
    } catch (e) {
      return WorkDone.buildError('Erreur dans la sélection des 10 produits');
    }
  }

  // @Get('offers')
  async getOffersFromProducts(products: ProductDto[]) : Promise<WorkDone<OffreDto[]>> {
    try {
      const dbOffers = await this.prismaService.offre.findMany({
        where: {
          codeProduit: {
            in: products.map((product) => product.code),
          },
        },
      });
      return WorkDone.buildOk(dbOffers);
    } catch (e) {
      return WorkDone.buildError('Erreur dans la recherche des offres');
    }
  }

  // @Get('/:code')
  async getSingleProduct(code: string): Promise<WorkDone<ProductDto>> {
    try {
      const dbProduct = await this.prismaService.produit.findUnique({
        where: {
          code: code,
        },
      });

      if (!dbProduct) {
        return WorkDone.buildError('Code introuvable dans la base de données');
      }

      return WorkDone.buildOk(dbProduct);
    } catch (e) {
      return WorkDone.buildError('Erreur dans la sélection du produit');
    }
  }

  // @Get('/filter')
  async queryProductfromLibelle(
    code: string,
    libelle: string,
  ): Promise<WorkDone<ProductDto[]>> {
    try {
      const dbProduct = await this.prismaService.produit.findMany({
        where: {
          libelle: {
            contains: libelle,
          },
          code: {
            startsWith: code,
          },
        },
        orderBy: {
          code: 'asc',
        },
      });
      if (!dbProduct) {
        return WorkDone.buildError('Pas de produit au libellé correspondant');
      }
      return WorkDone.buildOk(dbProduct);
    } catch (e) {
      return WorkDone.buildError('Erreur dans la recherche produit');
    }
  }

  // @Put('/:code')
  async putLibelleProduct(
    code: string,
    product: ProductDto,
  ): Promise<WorkDone<ProductDto>> {
    const wd: WorkDone<ProductDto> = await this.getSingleProduct(code);
    if (!wd.isOk) {
      return wd;
    }

    try {
      const dbProduct = await this.prismaService.produit.update({
        where: {
          code: code,
        },
        data: {
          libelle: product.libelle,
        },
      });

      return WorkDone.buildOk(dbProduct);
    } catch (e) {
      return WorkDone.buildError('Erreur dans la modification du libellé');
    }
  }

  // @Delete('/:code')
  async deleteProduct(code: string): Promise<string> {
    if (!(await this.getSingleProduct(code)).isOk) {
      return 'Aucun produit identifié avec ce code';
    }

    try {
      await this.prismaService.produit.delete({
        where: { code: code },
      });

      return 'Suppression du produit réalisée';
    } catch (e) {
      return 'Erreur dans la suppression du produit';
    }
  }

  // @Post('')
  async postProduct(product: ProductDto): Promise<WorkDone<ProductDto>> {
    if ((await this.getSingleProduct(product.code)).isOk) {
      return WorkDone.buildError('Le produit est déjà existant');
    }

    this.logger.info(`creating: ${JSON.stringify(product)}...`);
    const dbProduct = await this.prismaService.produit.create({
      data: product,
    });

    if (!dbProduct) {
      return WorkDone.buildError(
        'Erreur dans la création du produit dans la base de données',
      );
    }
    return WorkDone.buildOk(dbProduct);
  }
}
