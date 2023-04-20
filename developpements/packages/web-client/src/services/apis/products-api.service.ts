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

}
