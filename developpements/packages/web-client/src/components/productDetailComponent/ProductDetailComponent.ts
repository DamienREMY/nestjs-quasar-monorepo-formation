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



  onBeforeMount(async () => {

    const workD = await productsApiService.getProductDetail('')
    if(workD.isOk && !!workD.data) {
      product.value = workD.data
    }else{
      product.value = undefined
    }
  })

    return{
      product
    }

 }
})

