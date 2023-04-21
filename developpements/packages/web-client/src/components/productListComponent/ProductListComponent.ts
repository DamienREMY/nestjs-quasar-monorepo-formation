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

import { copyToClipboard } from 'quasar'

export default defineComponent({

 name: 'ProductListComponent',
 props: {
  title: {
    type: String,
    required: true
  }
 },

 setup() {

  const listProducts = ref<ProductDto[]>()

  onBeforeMount(async () => {

    const workD = await productsApiService.getProductsList()
    if(workD.isOk && !!workD.data) {
      listProducts.value = workD.data
    }else{
      listProducts.value = []
    }
  })

  const columns = ref([
    {
      name: 'code',
      required: true,
      label: 'Code produit',
      align: 'left',
      field: (row : ProductDto) => row.code,
      format: (val: string) => `${val}`,
      sortable: true

    },
    {
      name: 'libelle',
      required: true,
      label: 'Nom générique',
      align: 'left',
      field: (row: ProductDto) => row.libelle,
      format: (val: string) => `${val}`,
      sortable: true
    }])

    return{
      columns,
      listProducts,
      copyToClipboard
    }

 },

 methods : {

  async pushRouteToDetail(code : string) {
    localStorage.setItem('codeProduct',code)
    await this.$router.push('products/' + code)
  }

 }


})
