import { IPaginatedListDto, IPagination, ITEMS_PER_PAGE, ProductDto, WorkDone } from '@formation/shared-lib';

import { defineComponent, onBeforeMount, ref } from 'vue';

import { productsApiService } from '../../boot/api';

import { copyToClipboard, useQuasar } from 'quasar';
import { isUndefined } from 'lodash';

export default defineComponent({
  name: 'ProductListComponent',
  props: {
    title: {
      type: String,
      required: true,
    },
  },

  setup() {
    const initialPagination: IPagination = {
      page: 1,
      rowsPerPage: ITEMS_PER_PAGE,
      rowsNumber: 0,
    };

    const product = ref<ProductDto>({
      code: '',
      libelle: '',
      commentaires: '',
    });

    const loading = ref(true)
    const $quasar = useQuasar();
    const code = ref<string>('');
    const libelle = ref<string>('');
    const pagination = ref({
      ...initialPagination,
    });

    const IPagProducts = ref<IPaginatedListDto<ProductDto>>({
      list: [],
      page: 1,
    });

    onBeforeMount(async () => {

      const nbProducts = await productsApiService.getAllProducts();

      pagination.value.rowsNumber = !isUndefined(nbProducts.data) ? nbProducts.data : 0

      const workD = (await productsApiService.getProductsList('1'));

      if (workD.isOk && !!workD.data) {
        IPagProducts.value = workD.data;

        pagination.value.page = !isUndefined(IPagProducts.value.page) ? IPagProducts.value.page : 1
        pagination.value.rowsPerPage = !isUndefined(IPagProducts.value.rowsPerPage) ? IPagProducts.value.rowsPerPage : ITEMS_PER_PAGE


      } else {
        IPagProducts.value = {list:[], page :1};

      }
      loading.value = false

    });

    async function getProducts(props:any): Promise<WorkDone<boolean>> {

      loading.value = true

      const page:string = props.pagination.page
      pagination.value.page = Number(props.pagination.page)

      console.log(page)

      const workProducts = await productsApiService.getProductsList(String(page));

      if (workProducts.isOk && !!workProducts.data) {
        loading.value = false
        IPagProducts.value = workProducts.data
        console.log(IPagProducts.value)
        return WorkDone.buildOk(workProducts.isOk)

      }
      IPagProducts.value= {list:[], page:1};
      loading.value = false
      return WorkDone.buildOk(workProducts.isOk)

    }

    const columns = ref([
      {
        name: 'code',
        required: true,
        label: 'Code produit',
        align: 'left',
        field: (row: ProductDto ) => row.code,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'libelle',
        required: true,
        label: 'Libellé',
        align: 'left',
        field: (row: ProductDto) => row.libelle,
        format: (val: string) => `${val}`,
        sortable: true,
      },
      {
        name: 'commentaires',
        required: true,
        label: 'Commentaires',
        align: 'left',
        field: (row: ProductDto) => row.commentaires,
        format: (val: string) => `${val}`,
        sortable: false,
      },
    ]);

    return {
      columns,
      IPagProducts,
      code,
      libelle,
      product,
      pagination,
      loading,
      confirm: ref(false),
      getProducts,
      copyToClipboard,

      onSubmit(message: string, icon: string) {
        $quasar.notify({
          color: 'blue-3',
          textColor: 'black',
          icon: icon,
          message: message,
        });
      },

      onReset() {
        libelle.value = '';
      },
    };
  },

  methods: {
    async pushRouteToDetail(code: string) {
      localStorage.setItem('codeProduct', code);
      await this.$router.push('products/' + code);
    },

    async getProductFiltered(code: string, libelle: string) {
      const products = await productsApiService.getProductFiltered(
        code,
        libelle,
      );
      if (code.length > 0) {
        if (products.isOk && !!products.data) {
          this.IPagProducts = {list:[],page:1}//{ list : products.data}
        } else {
          this.IPagProducts = {list:[],page:1};
        }
      }
    },

    async postProduct(code: string, libelle: string) {
      this.product.code = code;
      this.product.libelle = libelle;

      await productsApiService.postProduct(this.product);

      this.onSubmit('Produit ajouté à la base de donnée', 'cloud_done');
    },
  },
});
