<template>

  <div class="page-product">

  <div class="information-product">

     <div class="form-detail-product">

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

      <q-btn id="delete-button" color="red" icon="delete" label="Supprimer le produit" @click="confirm = true"/>

      <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm">Souhaitez-vous vraiment supprimer ce produit de la base de données ?<br>(Vous serez redirigé vers la page de liste des produits)</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" v-close-popup />
          <q-btn flat label="Confirmer" color="primary" v-close-popup @click="deleteProduct()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </div>

<div class="form-update-product">
<q-form
    @submit="onSubmit()"
    @reset="onReset()"
    class="q-gutter-md">
            <q-input outlined label="Modifier le nom générique" stack-label
        v-model="libelle"
        hint=""
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Veuillez entrer un nom valide !']"
      />


  <q-btn label="Envoyer" type="submit" color="primary" @click="putLibelleToProduct(libelle)"/>
  <q-btn label="Remise à zéro" type="reset" color="primary" flat class="q-ml-sm" />

</q-form>
</div>


</div>


<div class = "button-navigation">
  <q-btn color="primary" icon="directions" label="Retour à la liste produit" @click="pushRouteToList()" />

</div>

</div>

</template>

<script lang="ts"
        src="./ProductDetailComponent.ts"></script>
<style lang="scss"
        src="./ProductDetailComponent.scss"></style>
