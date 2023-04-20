<template>
  <q-page class=" items-center justify-evenly">
<product-list-component title="Détail du produit">
</product-list-component>

  </q-page>
</template>

<script lang="ts">

import ProductDetailsComponent from 'components/productDetailsComponent/ProductDetailsComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductDetailsPage',
  components: { ProductDetailsComponent }
})
</script>
