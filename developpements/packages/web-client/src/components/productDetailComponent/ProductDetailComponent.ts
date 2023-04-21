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
import { isString, isUndefined} from 'lodash'
import { useQuasar } from 'quasar'

export default defineComponent({

 name: 'ProductDetailComponent',
 props: {
  title: {
    type: String,
    required: true,
  },
 },

 setup() {

  const $quasar = useQuasar()
  const libelle = ref<string>('')
  const product = ref<ProductDto>()
  const code: string | null = localStorage.getItem('codeProduct')

  if(isString(code)){
  onBeforeMount(async () => {

    const workD = await productsApiService.getProductDetail(code)

    if(workD.isOk && !!workD.data) {
      console.log(code)
      product.value = workD.data
    }else{
      product.value = undefined
    }
  })
}
    return{
      product,
      libelle,
      code,


  onSubmit() {

    $quasar.notify({
      color: 'blue-3',
      textColor: 'black',
      icon: 'cloud_done',
      message: 'Libellé modifié avec succès'

    })

  },

  onReset() {libelle.value = ''}}

 },
 methods:{

  pushRouteToList(){

    localStorage.clear()
    this.$router.go(-1)
  },


  async putLibelleToProduct(libelle:string){
    if(isString(this.code ) && !isUndefined(this.product)){

      if(this.libelle.length > 0 ){

        this.product.libelle = libelle
        await productsApiService.putLibelleProduct(this.code, this.product)

      }

    }else{
      console.log('Erreur dans la modification de la base de données')
    }
  }


 }
})

