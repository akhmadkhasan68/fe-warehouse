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
            <div class="row mb-3">
                <div class="col-12 col-md-4 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Produk</label>
                    <select name="product_id" id="product_id" class="form-control" v-model="keyword">
                        <option value="" selected>Semua Produk</option>
                        <option v-for="product in productOptions" :key="product" :value="product.value">
                            {{ product.text }}
                        </option>
                    </select>
                </div>
                <div class="col-12 col-md-4 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Status Transaksi</label>
                    <select name="product_id" id="product_id" class="form-control" v-model="status">
                        <option value="" selected>Semua</option>
                        <option value="in">Transaksi Masuk</option>
                        <option value="out">Transaksi Keluar</option>
                    </select>
                </div>
                <div class="col-12 col-md-4 col-xl-4">
                    <label for="example-text-input" class="form-control-label">Tanggal Transaksi</label>
                    <input type="text" v-model="daterange" id="daterange" ref="daterange" autocomplete="off" class="form-control"/>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 col-xl-4 mt-3" v-for="(transaction, key) in dataPaginateTransactions.data" :key="key">
                    <div @click="toDetail(transaction.id)" style="cursor:pointer;">
                        <div class="card">
                            <div class="card-body">
                                <span class="badge mb-3" :class="transaction.status == `out` ? `badge-warning` : `badge-success`">Transaksi {{ transaction.status.toUpperCase() }}</span>
                                <br>
                                <strong>Tanggal Transaksi: </strong> {{ localizationDate(transaction.date) }}
                                <br>
                                <strong>Nama Penginput: </strong> {{ transaction.operator.name }}
                                <br>
                                <strong>Jumlah Barang: </strong> {{ transaction.transaction_detail.length }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 col-md-12 col-xl-12">
                    <b-pagination
                    v-model="page"
                    :total-rows="dataPaginateTransactions.total"
                    :per-page="dataPaginateTransactions.per_page"
                    aria-controls="dataPaginateTransactions"
                    v-if="dataPaginateTransactions && dataPaginateTransactions.data.length > 0"
                    ></b-pagination>
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
            daterange: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
            status: "",
            keyword: "",
        }
    },
    mounted(){
        flatpickr(this.$refs.daterange, {
            mode: "range",
            dateFormat: "Y-m-d"
        });
    },
    created() {
        this.getDataProducts()
        this.getPaginateDataTransactions()
    },
    computed:{
        ...mapState('products', {
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
        ...mapState('transactions', {
            dataPaginateTransactions: state => state.dataPaginateTransactions,
            page: state => state.page
        }),
        dateranges() {
            return this.daterange.split("to")
        }
    },
    methods:{
        ...mapActions('products', ['getDataProducts']),
        ...mapActions('transactions', ['getPaginateDataTransactions']),
        getDataTransactionWithPayload()
        {
            let payload = {
                'date-from': this.dateranges[0],
                'date-to': this.dateranges[1],
                keyword: this.keyword,
                page: this.page
            }
            if(this.status != "") payload.status = this.status

            this.getPaginateDataTransactions(payload)
        },
        toDetail(id){
            this.$router.push({ name: 'admin.transaction.detail', params: { id } })
        }
    },
    watch: {
        daterange(){
            this.getDataTransactionWithPayload()
        },
        keyword(){
            this.getDataTransactionWithPayload()
        },
        status(){
            this.getDataTransactionWithPayload()
        },
        page(){
            this.getDataTransactionWithPayload()
        }
    },
}
</script>