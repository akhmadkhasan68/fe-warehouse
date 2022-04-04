import Vue from 'vue'
import VueRouter from 'vue-router'

/** Component View Begin*/

// Operator Component View
import OperatorHomeView from '@/views/Operator/OperatorHomeView.vue'
import TransactionsInView from '@/views/Operator/TransactionsInView.vue'
import TransactionsOutView from '@/views/Operator/TransactionsOutView.vue'
import ItemsView from '@/views/Operator/ItemsView.vue'
import OutletsView from '@/views/Operator/OutletsView.vue'
import OperatorsView from '@/views/Operator/OperatorsView.vue'

//Admin Component View
import AdminHomeView from '@/views/Admin/AdminHomeView.vue'

import NotFoundView from '@/views/NotFoundView.vue'

/** Component View End*/

Vue.use(VueRouter)

const routes = [
    {
        path: '/transactions',
        name: 'operator.home',
        component: OperatorHomeView,
        children: [
          {
            path: "in",
            name: "operator.transactions.in",
            component: TransactionsInView,
            meta:{
              role: "operator",
              title: "Transaksi Baru",
              subtitle: "Transaksi Masuk"
            }
          },
          {
            path: "out",
            name: "operator.transactions.out",
            component: TransactionsOutView,
            meta:{
              role: "operator",
              title: "Transaksi Baru",
              subtitle: "Transaksi Keluar"
            }
          },
        ],
        meta: {
          role: "operator",
          title: "Transaksi Baru"
        }
      },
      {
        path: '/items',
        name: 'operator.items',
        component: ItemsView,
        meta: {
          role: "operator",
          title: "Data Barang"
        }
      },
      {
        path: '/outlets',
        name: 'operator.outlets',
        component: OutletsView,
        meta: {
          role: "operator",
          title: "Data Outlet"
        }
      },
      {
        path: '/operators',
        name: 'operator.operators',
        component: OperatorsView,
        meta: {
          role: "operator",
          title: "Data Operator"
        }
      },
      {
        path: '/admin',
        name: 'admin.home',
        component: AdminHomeView,
        meta: {
          role: "admin",
          title: "Data Transaksi"
        }
      },
      {
        path: '/admin/items',
        name: 'admin.items',
        component: AdminHomeView,
        meta: {
          role: "admin",
          title: "Data Barang"
        }
      },
      {
        path: "/:pathMatch(.*)*",
        component: NotFoundView,
        meta: { errorNotFound: true }
      }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkExactActiveClass: "active"
})

router.beforeEach((to, from, next) => {
  if (to.path == "/") {
     next({name: "operator.home"})
  } else {
     next()
  }
})

const DEFAULT_TITLE = 'App Gudang'
router.afterEach(to => {
   Vue.nextTick(() => {
      document.title = `${DEFAULT_TITLE} | ${to.meta.title}` || DEFAULT_TITLE;
   })
})

export default router
