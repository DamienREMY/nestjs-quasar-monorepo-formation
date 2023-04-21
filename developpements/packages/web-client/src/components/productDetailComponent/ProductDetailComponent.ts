import {
  ProductDto,
} from '@formation/shared-lib'

import {
  defineComponent,
  onBeforeMount,
  ref
} from 'vue'


import {
  productsApiService
} from '../../boot/api'
import { isString } from 'lodash'

export default defineComponent({

 name: 'ProductDetailComponent',
 props: {
  title: {
    type: String,
    required: true,
  },
  code : String
 },

 setup() {

  const product = ref<ProductDto>()

  const code: string | null = localStorage.getItem('codeProduct')

  if(isString(code)){
  onBeforeMount(async () => {

    const workD = await productsApiService.getProductDetail(code)
    localStorage.clear()

    if(workD.isOk && !!workD.data) {
      product.value = workD.data
    }else{
      product.value = undefined
    }
  })
}


    return{
      product
    }

 }
})

