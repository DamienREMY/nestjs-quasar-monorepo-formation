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

import { copyToClipboard, useQuasar } from 'quasar'
import { isUndefined } from 'lodash'

export default defineComponent({

 name: 'ProductListComponent',
 props: {
  title: {
    type: String,
    required: true
  }
 },

 setup() {

  const product = ref<ProductDto>({code:'',libelle:''})
  const $quasar = useQuasar()
  const code = ref<string>('')
  const libelle = ref<string>('')

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
      code,
      libelle,
      product,
      confirm: ref(false),
      copyToClipboard,

      onSubmit() {

        $quasar.notify({
          color: 'blue-3',
          textColor: 'black',
          icon: 'cloud_done',
          message: 'Produit ajouté avec succès'

        })

      },

      onReset() {libelle.value = ''}}

 },

 methods : {

  async pushRouteToDetail(code : string) {
    localStorage.setItem('codeProduct',code)
    await this.$router.push('products/' + code)
  },

  async postProduct(code:string, libelle:string){

      this.product.code = code
      this.product.libelle = libelle

    await productsApiService.postProduct(this.product)

    this.onSubmit()

  }

 }

})
