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

export default defineComponent({

 name: 'ProductListComponent',
 props: {
  title: {
    type: String,
    required: true
  }
 },

 setup() {

  const product = ref<ProductDto>({code:'',libelle:'',commentaires:''})
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
      label: 'Libellé',
      align: 'left',
      field: (row: ProductDto) => row.libelle,
      format: (val: string) => `${val}`,
      sortable: true
    },
  {
    name: 'commentaires',
    required: true,
    label: 'Commentaires',
    align: 'left',
    field: (row:ProductDto) => row.commentaires,
    format: (val: string) => `${val}`,
    sortable:false

  }])

    return{
      columns,
      listProducts,
      code,
      libelle,
      product,
      confirm: ref(false),
      copyToClipboard,

      onSubmit(message:string) {

        $quasar.notify({
          color: 'blue-3',
          textColor: 'black',
          icon: 'cloud_done',
          message: message

        })

      },

      onReset() {libelle.value = ''}}

 },

 methods : {

  async pushRouteToDetail(code : string) {
    localStorage.setItem('codeProduct',code)
    await this.$router.push('products/' + code)
  },

  async getProducts():Promise<ProductDto[]>{

    const workProducts = await productsApiService.getProductsList()

    if(workProducts.isOk && !!workProducts.data) {
      return workProducts.data
    }
      workProducts.data = []
      return workProducts.data
    },

  async queryProductfromLibelle(libelle:string){

    const products = await productsApiService.queryProductfromLibelle(libelle)

    if(products.isOk && !! products.data) {
      this.listProducts = products.data
    }else{
      this.listProducts = []
    }
  },

  async postProduct(code:string, libelle:string){

      this.product.code = code
      this.product.libelle = libelle

    await productsApiService.postProduct(this.product)

    this.onSubmit('Produit ajouté à la base de donnée')

  }

 }

})
