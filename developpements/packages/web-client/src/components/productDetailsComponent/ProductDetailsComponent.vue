<template>
     <div class="q-px-sm q-px-md-md">

      <q-table
          :columns="columns"
          :grid="$q.screen.lt.md"
          :rows="listProducts"
          binary-state-sort
          row-key="code"
          style="with: 100%"
          title="Liste des produits"
      >
      </q-table>
     </div>
</template>

<script lang="ts"
        src="./ProductDetailsComponent.ts"></script>
