<template>
  <div class="list-product-page">
    <q-form
      @submit="onSubmit('Recherche finalisée','fa fa-search')"
      @reset="onReset()"
      class="filter-form"
    >
    <q-input
        class="filter-input"
        v-model="code"
        label="Code commençant par: "
        stack-label
        lazy-rules
        :rules="[
          (val) =>
            (val && val.length > 0) || 'Veuillez entrer un code valide !',
        ]"
      />
      <q-input
        class="filter-input"
        v-model="libelle"
        label="Libellé contenant: "
        placeholder="(Optionnel)"
        stack-label
      />
      <q-btn
        class="filter-button"
        color="primary"
        icon="fa fa-search"
        label="Rechercher"
        type="submit"
        @click="getProductFiltered(code,libelle)"
      />
    </q-form>
    <div>
      <q-table
        v-model:pagination="pagination"
        :columns="columns"
        :grid="$q.screen.lt.md"
        :rows="IPagProducts.list"
        :loading="loading"
        binary-state-sort
        row-key="code"
        title="Liste des produits"
        @request="getProducts"
      >
        <template #body-cell-code="props">
          <q-td :props="props">
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

    <div>
      <q-btn
        id="add-button"
        color="primary"
        icon="add"
        label="Ajouter un produit"
        @click="confirm = true"
      />

      <q-dialog v-model="confirm" persistent>
        <q-card>
          <q-card-section class="dialbox-add-product">
            <q-avatar icon="add" color="primary" text-color="white" />
            <span id="dialbox-title">Formulaire d'ajout de produit</span>

            <div class="dialbox-content">
              <q-input
                outlined
                label="Code du produit"
                stack-label
                v-model="code"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer un code valide !',
                ]"
              />

              <q-input
                outlined
                label="Libellé du produit"
                stack-label
                v-model="libelle"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) ||
                    'Veuillez entrer un libellé valide !',
                ]"
              />

              <q-btn flat label="Annuler" color="primary" v-close-popup />
              <q-btn
                flat
                label="Ajouter"
                color="primary"
                v-close-popup
                @click="postProduct(code, libelle)"
              />
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script lang="ts" src="./ProductListComponent.ts"></script>
<style lang="scss" src="./ProductListComponent.scss"></style>
