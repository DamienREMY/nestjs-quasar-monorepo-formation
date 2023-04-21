import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'customers', component: () => import('pages/CustomerPage.vue') },
      {
        path: 'refs', children: [
          { path: 'products', component: () => import('pages/ProductPage.vue') }
        ]
      },
    {
      path: 'products', children: [
        { path: '', component: () => import ('pages/ProductListPage.vue')},
         { path: '/products/:code', component: ()=> import ('pages/ProductDetailPage.vue')}
        ]
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
