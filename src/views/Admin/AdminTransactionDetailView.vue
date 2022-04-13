<template>
    <div>
        <div class="card shadow-lg mx-4">
            <div class="card-body p-3">
                <div class="row">
                    <div class="col-auto my-auto">
                        <div class="h-100">
                        <h5>{{ $route.meta.title }}</h5>
                        <p class="mb-0 font-weight-bold text-sm">Halaman {{ $route.meta.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid py-4">
            <div class="row justify-content-between">
                <div class="col-10 col-lg-10 col-xl-10">
                    <p>
                        <strong>Nama Operator:</strong> {{ dataDetailTransaction.operator.name }}
                        <br>
                        <strong>Tanggal Transaksi: </strong> {{ localizationDate(dataDetailTransaction.date) }}
                        <br>
                        <strong>Jumlah Barang: </strong> {{ dataDetailTransaction.transaction_detail.length }}
                        <br>
                        <span v-if="isStatusIn">
                            <strong>Total Transaksi: </strong> {{ formatRupiah(totalTransaction) }}
                            <br>
                        </span>
                        <span class="badge mt-3" :class="dataDetailTransaction.status == `out` ? `badge-warning` : `badge-success`">Transaksi {{ dataDetailTransaction.status.toUpperCase() }}</span>
                    </p>
                </div>
                <div class="col-2 col-lg-2 col-xl-2">
                    <button class="btn btn-sm btn-success w-100" v-if="!isEdit" @click="editData"><i class="fa fa-edit"></i> Edit Transaksi</button>
                    <button class="btn btn-sm btn-primary w-100" v-if="isEdit" @click="saveAll"><i class="fa fa-check"></i> Simpan</button>
                </div>
            </div>
           <div class="row">
               <div class="col-12">
                   <div class="card">
                       <div class="table-responsive">

                            <table class="table align-items-center mb-0" v-if="!isEdit">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Nama Barang</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Rata-Rata Harga / 30 Hari</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center" v-if="isStatusIn">Harga</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Jumlah Barang</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="dataDetailTransaction.transaction_detail.length == 0">
                                        <td :colspan="isStatusIn ? 5 : 4" class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">Data Kosong!</p>
                                        </td>
                                    </tr>
                                    <tr v-for="(data, key) in dataDetailTransaction.transaction_detail" :key="key" v-else>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.product.name }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ formatRupiah(data.product.avg_price) }}</p>
                                        </td>
                                        <td class="align-middle text-center" v-if="isStatusIn">
                                            <p class="text-xs font-weight-bold mb-0">{{ formatRupiah(data.price) }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.quantity}}</p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>    
                            
                            <table class="table align-items-center mb-0" v-else-if="isEdit && isStatusIn">
                                <thead>
                                    <tr>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="30%">Barang</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Rata Harga <br> / 30 Hari</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Harga</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Jumlah</th>
                                    <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="products.length < 1">
                                        <td colspan="5">
                                            <center>
                                                <span class="text-sm">Belum Ada Item</span>
                                            </center>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="(item, key) in products" :key="key">
                                        <td>
                                            <select class="form-control" id="exampleFormControlSelect1" v-model="item.product_id" @change="changeProduct(key)">
                                                <option value="">Pilih Barang Ke-{{ key+1 }}</option>
                                                <option v-for="product in productsOptions" :key="product" :value="product.value">
                                                    {{ product.text }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">Rp.{{ item.avg_price }}</p>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <span class="input-group-text">Rp.</span>
                                                <input class="form-control" placeholder="Masukkan Harga" type="text" v-model="item.price">
                                                <span class="input-group-text" v-if="item.unit !== ''">@{{item.unit}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" placeholder="Masukkan Jumlah" type="text" v-model="item.quantity">
                                                <span class="input-group-text" v-if="item.unit !== ''">/{{item.unit}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a style="cursor:pointer;" @click="deleteItem(key)" class="text-danger font-weight-bold" data-toggle="tooltip" data-original-title="Hapus Item Ini">
                                                <i class="fa fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <button @click="addItem()" class="btn btn-outline-primary btn-md w-100"><i class="fa fa-plus"></i> Tambah</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <table class="table align-items-center mb-0" v-else-if="isEdit && !isStatusIn">
                                <thead>
                                    <tr>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="30%">Barang</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Rata Harga <br> / 30 Hari</th>
                                    <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Jumlah</th>
                                    <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="products.length < 1">
                                        <td colspan="5">
                                            <center>
                                                <span class="text-sm">Belum Ada Item</span>
                                            </center>
                                        </td>
                                    </tr>
                                    <tr v-else v-for="(item, key) in products" :key="key">
                                        <td>
                                            <select class="form-control" id="exampleFormControlSelect1" v-model="item.product_id" @change="changeProduct(key)">
                                                <option value="">Pilih Barang Ke-{{ key+1 }}</option>
                                                <option v-for="product in productsOptions" :key="product" :value="product.value">
                                                    {{ product.text }}
                                                </option>
                                            </select>
                                        </td>
                                        <td>
                                            <p class="text-xs font-weight-bold mb-0">Rp.{{ item.avg_price }}</p>
                                        </td>
                                        <td>
                                            <div class="input-group">
                                                <input class="form-control" placeholder="Masukkan Jumlah" type="text" v-model="item.quantity">
                                                <span class="input-group-text" v-if="item.unit !== ''">/{{item.unit}}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <a style="cursor:pointer;" @click="deleteItem(key)" class="text-danger font-weight-bold" data-toggle="tooltip" data-original-title="Hapus Item Ini">
                                                <i class="fa fa-trash"></i>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="5">
                                            <button @click="addItem()" class="btn btn-outline-primary btn-md w-100"><i class="fa fa-plus"></i> Tambah</button>
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
import {mapState, mapActions} from 'vuex'
import $axios from '@/services/api'

export default({
    data(){
        return {
            isEdit: false,
            products : []
        }
    },
    created(){
        this.getDetailTransaction(this.$route.params.id)
        this.getDataProducts()
    },
    computed:{
        ...mapState('transactions', {
            dataDetailTransaction: state => state.dataDetailTransaction,
            totalTransaction: state => {
                let total = 0
                state.dataDetailTransaction.transaction_detail.map(detail => {
                    total += parseInt(detail.price)
                })

                return total
            },
            operator_id: state => state.dataDetailTransaction.operator_id,
            outlet_id: state => state.dataDetailTransaction.outlet_id,
            date: state => state.dataDetailTransaction.date,
            status: state => state.dataDetailTransaction.status,
        }),
        ...mapState('products', {
            productsOptions: state => {
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
        isStatusIn(){
            return this.dataDetailTransaction.status == 'in'
        }
    },
    methods:{
        ...mapActions('transactions', ['getDetailTransaction']),
        ...mapActions('products', ['getDataProducts', 'getDetailProduct']),
        addItem(){
            this.products.push({
                unit: "",
                product_id: "",
                avg_price: 0,
                price: "",
                quantity: ""
            })
        },
        deleteItem(index)
        {
            this.products.splice(index, 1);
        },
        editData(){
            this.isEdit = true
            this.getDetailTransaction(this.$route.params.id).then(response => {
                let datas = [];
                response.transaction_detail.map(detail => {
                    datas.push({
                        unit: detail.product.unit.name,
                        product_id: detail.product_id,
                        avg_price: detail.avg_price,
                        price: detail.price,
                        quantity: detail.quantity
                    })
                })
        
                this.products = datas
            })
        },
        saveAll(){
            this.$swal.fire({
                title: 'Apakah anda yakin untuk menyimpan data ini?',
                text: 'Pastikan data yang telah anda masukkan benar',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Ya',
            }).then((result) => {
                if (result.isConfirmed) {
                    $axios.patch(`/admin/transactions/${this.$route.params.id}`, {
                        operator_id: this.operator_id,
                        outlet_id: this.outlet_id,
                        date: this.date,
                        status: this.status,
                        products: this.products
                    })
                    .then((response) => {
                        this.getDetailTransaction(this.$route.params.id)
                        this.$toastr.s("Berhasil mengedit transaksi");
                        this.isEdit = false
                    })
                    .catch((error) => {
                        error.map(message => {
                            this.$toastr.e(message);
                        })
                    })
                }
            })
        },
    }
})
</script>
