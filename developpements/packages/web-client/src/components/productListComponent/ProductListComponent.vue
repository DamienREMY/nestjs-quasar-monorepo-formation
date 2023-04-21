<template>
     <div>

      <q-table
          :columns="columns"
          :grid="$q.screen.lt.md"
          :rows="listProducts"
          binary-state-sort
          row-key="code"
          style="with: 100%"
          title="Liste des produits"
      >
      <template #body-cell-code="props">
    <q-td
      :props="props"
    >
      <q-btn
        flat
        color="primary"
        :label="props.value"
        @click="pushRouteToDetail(props.value)"
      />
    </q-td>
  </template>


      </q-table>
     </div>
</template>

<script lang="ts"
        src="./ProductListComponent.ts"></script>
