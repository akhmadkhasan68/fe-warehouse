<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card ">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Nama Operator</label>
                                    <select class="form-control" id="exampleFormControlSelect1" v-model="formData.operator_id">
                                        <option value="">Pilih Operator</option>
                                        <option v-for="operator in operatorOptions" :key="operator" :value="operator.value">
                                            {{ operator.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Outlet</label>
                                    <select class="form-control" id="exampleFormControlSelect1" v-model="formData.outlet_id">
                                        <option value="">Pilih Outlet</option>
                                        <option v-for="outlet in outletsOptions" :key="outlet" :value="outlet.value">
                                            {{ outlet.text }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Tanggal</label>
                                    <flat-pickr class="form-control" v-model="formData.date"></flat-pickr>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-12">
                                <!-- <div class="card shadow"> -->
                                    <div class="table-responsive">
                                        <table class="table align-items-center mb-0">
                                            <thead>
                                                <tr>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7" width="30%">Barang</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">Rata Harga <br> / 30 Hari</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Jumlah</th>
                                                <th class="text-secondary opacity-7"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="formData.products.length < 1">
                                                    <td colspan="5">
                                                        <center>
                                                            <span class="text-sm">Belum Ada Item</span>
                                                        </center>
                                                    </td>
                                                </tr>
                                                <tr v-else v-for="(item, key) in formData.products" :key="key">
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
                                    <!-- </div> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row mt-3">
            <div class="col-lg-3">
                <button @click="saveAll()" class="btn btn-primary w-100">
                    <i class="fa fa-check"></i> Simpan
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import $axios from "@/services/api"

const date = new Date();

export default {
    data(){
        return {
            formData: {
                operator_id: "",
                outlet_id: "",
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                status: "out",
                products: [
                    {
                        unit: "",
                        product_id: "",
                        avg_price: 0,
                        price: "",
                        quantity: ""
                    }
                ]
            }
        }
    },
    created() {
        this.getDataOperators()
        this.getDataProducts()
        this.getDataOutlets()
    },
    computed:{
        operatorOptions(){
            let options =  []
            this.$store.state.operators.dataOperators.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
        productsOptions(){
            let options =  []
            this.$store.state.products.dataProducts.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
        outletsOptions(){
            let options =  []
            this.$store.state.outlets.dataOutlets.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
    },
    methods:{
        ...mapActions('operators', ['getDataOperators']),
        ...mapActions('products', ['getDataProducts', 'getDetailProduct']),
        ...mapActions('outlets', ['getDataOutlets']),
        addItem(){
            this.formData.products.push({
                unit: "",
                product_id: "",
                avg_price: 0,
                price: "",
                quantity: ""
            })
        },
        resetForm(){
            this.formData = {
                operator_id: "",
                outlet_id: "",
                date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                status: "out",
                products: [
                    {
                        unit: "",
                        product_id: "",
                        avg_price: 0,
                        price: "",
                        quantity: ""
                    }
                ]
            }
        },
        deleteItem(index)
        {
            this.formData.products.splice(index, 1);
        },
        changeProduct(key)
        {
            this.getDetailProduct(this.formData.products[key].product_id).then(response => {
                this.formData.products[key].unit = response.unit.name
                this.formData.products[key].avg_price = response.avg_price
            }).catch(err => console.log(err))
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
                    $axios.post(`/operator/transactions`, this.formData)
                    .then((response) => {
                        this.$toastr.s("Berhasil menambahkan transaksi");
                        this.resetForm()
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
}
</script>