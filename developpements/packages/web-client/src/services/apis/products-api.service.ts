import {
  ProductDto,
  WorkDone
} from '@formation/shared-lib'
import { AxiosInstance } from 'axios'
import { AbstractApiService } from './abstract-api.service'

export class ProductsApiService extends AbstractApiService {

  constructor (axiosInstance: AxiosInstance, serviceApiBaseUrl: string) {
    super(axiosInstance, serviceApiBaseUrl)
  }

  // Get a list of products of the first to the tenth
  public async getProductsList (): Promise<WorkDone<ProductDto[]>> {
    return this.doGet('')
  }

  // Get a list of products filtered from a "libelle"
  public async queryProductfromLibelle (libelle:string) : Promise<WorkDone<ProductDto[]>> {
    return this.doGet(`/filter?libelle=${libelle}`)
  }

  // Get a single product from its code
  public async getProductDetail (code : string): Promise<WorkDone<ProductDto>> {
    return this.doGet(`/${code}`)
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
