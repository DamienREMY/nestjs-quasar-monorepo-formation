<template>
     <div>

      <q-field filled label="Code Produit" stack-label>
        <template v-slot:control>
          <div> {{ product?.code }} </div>
        </template>
      </q-field>


      <q-field outlined label="Nom générique" stack-label>
        <template v-slot:control>
          <div>{{product?.libelle }}
          </div>
        </template>
      </q-field>

  </div>

  <div>
<q-form
    @submit="onSubmit()"
    @reset="onReset()"
    class="q-gutter-md">
            <q-input outlined label="Modifier le nom générique" stack-label
        filled
        v-model="libelle"
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Veuillez entrer un nom valide !']"
      />

  <q-btn label="Envoyer" type="submit" color="primary" @click="putLibelleToProduct(libelle)"/>
  <q-btn label="Remise à zéro" type="reset" color="primary" flat class="q-ml-sm" />
</q-form>
  </div>

<div class="q-pa-md q-gutter-sm">
    <q-btn color="primary" icon="directions" label="Retour à la liste produit" @click="pushRouteToList()" />
    </div>


</template>

<script lang="ts"
        src="./ProductDetailComponent.ts"></script>
