<template>
  <q-page class=" items-center justify-evenly">
<product-list-component title="Liste des produits">
</product-list-component>

  </q-page>
</template>

<script lang="ts">

import ProductListComponent from 'components/productListComponent/ProductListComponent.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductListPage',
  components: { ProductListComponent }
})
</script>
