import {
  IPaginatedListDto,
  OffreDto,
  ProductDto,
  WorkDone
} from '@formation/shared-lib'
import { AxiosInstance } from 'axios'
import { AbstractApiService } from './abstract-api.service'

export class ProductsApiService extends AbstractApiService {

  constructor (axiosInstance: AxiosInstance, serviceApiBaseUrl: string) {
    super(axiosInstance, serviceApiBaseUrl)
  }

  // Get a list of ten products
  public async getProductsList (page: string): Promise<WorkDone<IPaginatedListDto<ProductDto>>> {
    return this.doGet(`?page=${page}`)
  }

  // Get the total of products in the data base "produits"
  public async getAllProducts():Promise<WorkDone<number>> {
    return this.doGet('all')
  }

  // Get a list of products filtered from a "libelle"
  public async getProductFiltered (code:string,libelle:string) : Promise<WorkDone<ProductDto[]>> {
    return this.doGet(`/filter?code=${code}&libelle=${libelle}`)
  }

  // Get a single product from its code
  public async getProductDetail (code : string): Promise<WorkDone<ProductDto>> {
    return this.doGet(`/${code}`)
  }

  // Get offers from products code
  public async getOffersFromProducts(products: ProductDto[]) : Promise<WorkDone<OffreDto[]>>{
    return this.doGet('offers', products)
  }


  // Put a new libelle for a product given its code
  public async putLibelleProduct (code: string, product: ProductDto): Promise<WorkDone<ProductDto>>{
    return this.doPut(`/${code}`, product)
  }

  // Delete a product from the database given its code
  public async deleteProduct (code: string): Promise<WorkDone<string>>{
    return this.doDelete(`/${code}`)
  }

  // Add a new product into the database
  public async postProduct (product: ProductDto): Promise<WorkDone<ProductDto>>{
    return this.doPost('', product)
  }

}
