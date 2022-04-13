import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import BootstrapVue from 'bootstrap-vue'
import VueSweetalert2 from 'vue-sweetalert2'
import VueToastr$1 from 'vue-toastr'

import "bootstrap-vue/dist/bootstrap-vue.css"
import 'sweetalert2/dist/sweetalert2.min.css'

import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

Vue.mixin({
  methods:{
    formatRupiah(money) {
      return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
      ).format(money);
    },
    localizationDate(fullDate){
      let objDate = new Date(fullDate)
      let year = objDate.getFullYear()
      let month = objDate.getMonth()
      let date = objDate.getDate()

      let localization = new Date(Date.UTC(year, month, date, 0, 0, 0));
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

      return localization.toLocaleDateString('id-ID', options)
    }
  }
})


Vue.config.productionTip = false

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(VueFlatPickr);
Vue.use(VueToastr$1)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
