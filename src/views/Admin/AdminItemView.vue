<template>
    <div>
        <div class="card shadow-lg mx-4">
            <div class="card-body p-3">
                <div class="row">
                    <div class="col-auto my-auto">
                        <div class="h-100">
                        <h5>{{ $route.meta.title }}</h5>
                        <p class="mb-0 font-weight-bold text-sm">Halaman daftar data {{ $route.meta.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid py-4">
            <div class="row mb-3 justify-content-between">
                <div class="col-12 col-md-12 col-xl-6">
                    <div class="row">
                        <label for="example-text-input" class="form-control-label">Search Produk</label>
                        <div class="col-12 col-md-8 col-xl-8">
                            <input type="text" class="form-control" placeholder="Search berdasarkan nama" v-model="keyword"/>
                        </div>
                        <div class="col-12 col-md-4 col-xl-4">
                            <select name="" id="" class="form-control" v-model="category_id">
                                <option value="">Semua Kategori</option>
                                <option v-for="category in categoryOptions" :key="category" :value="category.value">
                                    {{ category.text }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- <div class="col-12 col-md-12 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Tanggal Transaksi</label>
                    <input type="text" v-model="daterange" id="daterange" ref="daterange" autocomplete="off" class="form-control"/>
                </div> -->
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="alert alert-info text-white">
                        <strong>Info <i class="fa fa-info-circle"></i></strong>
                        <p>
                            Total Estimasi gudang anda keseluruan adalah {{ formatRupiah(totalEstimation) }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">No.</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Nama</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Rata Harga</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Sisa Stock</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Estimasi Harga</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="dataPaginateProducts.data.length == 0">
                                        <td colspan="5" class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">Data Kosong!</p>
                                        </td>
                                    </tr>
                                    <tr v-for="(data, key) in dataPaginateProducts.data" :key="key" v-else>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ key+1 }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.name }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.avg_price }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.quantity}}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.quantity * data.avg_price }}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import flatpickr from 'flatpickr'

export default {
    data(){
        let date = new Date()

        return {
            // daterange: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        }
    },
    mounted(){
        // flatpickr(this.$refs.daterange, {
        //     mode: "range",
        //     dateFormat: "Y-m-d"
        // });
    },
    created() {
        this.getPaginateDataProducts().then(response => {
            this.$store.commit('products/SET_PER_PAGE', response.total)
        })
        this.getDataCategories()
    },
    computed:{
        ...mapState('products', {
            dataPaginateProducts: state => state.dataPaginateProducts,
            totalEstimation: state => {
                let data = state.dataPaginateProducts.data
                let total = 0
                data.map(product => {
                    total += parseInt(product.avg_price * product.quantity)
                })

                return total
            },
            productOptions: state => {
                let options =  []
                state.dataProducts.map(data => {
                    options.push({
                        value: data.id,
                        text: data.name
                    })
                });

                return options
            },
        }),
        ...mapState('categories', {
            categoryOptions: state => {
                let options =  []
                state.dataCategories.map(data => {
                    options.push({
                        value: data.id,
                        text: data.name
                    })
                });

                return options
            }
        }),
        // dateranges() {
        //     return this.daterange.split("to")
        // },
        keyword: {
            get() {
                return this.$store.state.products.keyword
            },
            set(val) {
                this.$store.commit('products/SET_KEYWORD', val)
            }
        },
        category_id: {
            get() {
                return this.$store.state.products.category_id
            },
            set(val) {
                this.$store.commit('products/SET_CATEGORY', val)
            }
        }
    },
    methods:{
        ...mapActions('products', ['getPaginateDataProducts']),
        ...mapActions('categories', ['getDataCategories']),
        
    },
    watch: {
        keyword() {
            this.getPaginateDataProducts()
        },
        category_id(){
            this.getPaginateDataProducts()
        }
    },
}
</script>