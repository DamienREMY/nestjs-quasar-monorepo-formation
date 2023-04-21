<template>
  <q-page class=" items-center justify-evenly">
<product-detail-component title="Détail du produit">
</product-detail-component>

  </q-page>
</template>

<script lang="ts">

import ProductDetailComponent from 'components/productDetailComponent/ProductDetailComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductDetailPage',
  components: { ProductDetailComponent }
})
</script>
