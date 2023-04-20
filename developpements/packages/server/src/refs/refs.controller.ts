import { LoggerService } from '@formation/servers-lib/dist/services'
import { AbstractController } from '@formation/servers-lib/dist/utils'
import {
  CodeLabelResultDto,
  OffreReferenceResultDto,
  ProductDto,
  WorkDone
} from '@formation/shared-lib'
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { RefsService } from './refs.service'

@Controller('refs')
export class RefsController extends AbstractController {

  constructor (
    private readonly logger: LoggerService,
    private readonly refsService: RefsService
  ) {
    super()
    this.logger.info('RefsController created')
  }

  @Get('/campagne/:codeCampagne/offres-ref/:codeOffre')
  async findOffreReference (@Param('codeCampagne') codeCampagne: string,
    @Param('codeOffre') codeOffre: string): Promise<WorkDone<OffreReferenceResultDto>> {
    const wd = await this.refsService.searchOffreReference(parseInt(codeCampagne, 10), codeOffre)
    if (wd.isOk && !!wd.data) {
      // Mise à jour de la date de dernière modification
      return this.refsService.updateOffreReferenceDateDerniereModification(wd.data[0])
    }
    return WorkDone.toError(wd)
  }

  @Get('/fichparts')
  async getAllFichParts (): Promise<WorkDone<CodeLabelResultDto[]>> {
    return this.refsService.getAllFichParts()
  }

  @Get('/campagne/:codeCampagne/offres-ref')
  async searchOffresReferences (@Param('codeCampagne') codeCampagne: string,
    @Query('codeProduit') codeProduit?: string): Promise<WorkDone<OffreReferenceResultDto[]>> {
    return this.refsService.searchOffreReference(parseInt(codeCampagne, 10), null, codeProduit)
  }

  @Get('/produits')
  async getProduit() : Promise<WorkDone<ProductDto[]>> {

    return this.refsService.getProduit();

  }

  @Get('/produits/:codeProduit')
  async getProduitByCode(@Param('codeProduit') codeProduit: string): Promise<WorkDone<ProductDto>> {

    return this.refsService.getProduitByCode(codeProduit);

  }

  @Post('/produits')
  async createProduit(@Body() produit: ProductDto): Promise<WorkDone<ProductDto>> {

    return this.refsService.createProduit(produit);

  }
  @Put('/produits/:codeProduit')
  async updateProduit(@Param(`codeProduit`) codeProduit: string,
  @Body() product: ProductDto): Promise<WorkDone<ProductDto>> {

    return this.refsService.updateProduit(codeProduit, product);

  }


  @Delete('/produits/:codeProduit')
  async deleteProduit(@Param('codeProduit') codeProduit: string): Promise<string> {

    return this.refsService.deleteProduit(codeProduit);
  }

}
