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
            <div class="row">
                <div class="col-12 col-md-2 col-xl-2">
                    <button class="btn btn-primary w-100" @click="modalShow = !modalShow">
                        <i class="fa fa-plus"></i> Tambah
                    </button>
                </div>
                <div class="col-12 col-md-4 col-xl-4">
                    <input type="text" class="form-control form-control-alternative" placeholder="Search" v-model="keyword">
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-12 col-xl-12">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">No.</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Nama</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Kategori</th>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Satuan</th>
                                        <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="dataPaginateProducts.data.length == 0">
                                        <td colspan="3" class="align-middle text-center">
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
                                            <p class="text-xs font-weight-bold mb-0">{{ data.category.name }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.unit.name }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <button class="btn btn-success btn-sm mx-2" @click="editData(data)">
                                                <i class="fa fa-pencil"></i> Edit
                                            </button>
                                            <button class="btn btn-danger btn-sm mx-2" @click="deleteData(data.id)">
                                                <i class="fa fa-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-12 col-md-12 col-xl-12">
                    <b-pagination
                    v-model="page"
                    :total-rows="dataPaginateProducts.total"
                    :per-page="dataPaginateProducts.per_page"
                    aria-controls="dataPaginateProducts"
                    v-if="dataPaginateProducts && dataPaginateProducts.data.length > 0"
                    ></b-pagination>
                </div>
            </div>
        </div>

        <b-modal 
            ref="modal"
            size="lg"
            v-model="modalShow"
            title="Tambah Data Barang"
            @ok="handleOk">

            <form id="myFormAdd" @submit.stop.prevent="submitAddFormData">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Nama Barang:</label>
                    <input type="text" class="form-control" v-model="formData.name" :reduce="data => {data.value}" placeholder="Masukkan Nama Barang">
                </div>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Kategori Barang:</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="formData.category_id" required>
                        <option value="">Pilih Kategori</option>
                        <option v-for="category in categoriesOptions" :key="category" :value="category.value">
                            {{ category.text }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">Satuan:</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="formData.unit_id" required>
                        <option value="">Pilih Satuan</option>
                        <option v-for="unit in unitsOptions" :key="unit" :value="unit.value">
                            {{ unit.text }}
                        </option>
                    </select>
                </div>
            </form>
        </b-modal>

        <b-modal 
            ref="modal"
            size="lg"
            v-model="modalEditShow"
            title="Edit Data Barang"
            @ok="handleOkEdit">
            <form id="myFormAdd" @submit.stop.prevent="submitEditFormData">
                <input type="hidden" v-model="formDataEdit.id">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Nama Barang:</label>
                    <input type="text" class="form-control" v-model="formDataEdit.name" :reduce="data => {data.value}" placeholder="Masukkan Nama Barang">
                </div>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Kategori Barang:</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="formDataEdit.category_id" required>
                        <option value="">Pilih Kategori</option>
                        <option v-for="category in categoriesOptions" :key="category" :value="category.value">
                            {{ category.text }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">Satuan:</label>
                    <select class="form-control" id="exampleFormControlSelect1" v-model="formDataEdit.unit_id" required>
                        <option value="">Pilih Satuan</option>
                        <option v-for="unit in unitsOptions" :key="unit" :value="unit.value">
                            {{ unit.text }}
                        </option>
                    </select>
                </div>
            </form>
        </b-modal>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import $axios from "@/services/api"

export default {
    data(){
        return {
            formData: {
                category_id: "",
                unit_id: "",
                name: "",
            },
            formDataEdit: {
                category_id: "",
                unit_id: "",
                name: "",
                id: ""
            },
            modalShow: false,
            modalEditShow: false
        }
    },
    created() {
        this.getDataUnits()
        this.getDataCategories()
        this.getPaginateDataProducts()
    },
    computed:{
        ...mapState('products', {
            dataPaginateProducts: state => state.dataPaginateProducts,
            page: state => state.page,
            keyword: state => state.keyword
        }),
        unitsOptions(){
            let options =  []
            this.$store.state.units.dataUnits.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
        categoriesOptions(){
            let options =  []
            this.$store.state.categories.dataCategories.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
        page: {
            get() {
                return this.$store.state.products.page
            },
            set(val) {
                this.$store.commit('products/SET_PAGE', val)
            }
        },
        keyword: {
            get() {
                return this.$store.state.products.keyword
            },
            set(val) {
                this.$store.commit('products/SET_KEYWORD', val)
            }
        }
    },
    methods:{
        ...mapActions('units', ['getDataUnits']),
        ...mapActions('categories', ['getDataCategories']),
        ...mapActions('products', ['getPaginateDataProducts']),
        resetForm(){
            this.formData = {
                category_id: "",
                unit_id: "",
                name: ""
            }
        },
        resetFormEdit(){
            this.formDataEdit = {
                category_id: "",
                unit_id: "",
                name: "",
                id: "",
            }
        },
        editData(data){
            this.formDataEdit = {
                category_id: data.category_id,
                unit_id: data.unit_id,
                name: data.name,
                id: data.id
            }
            this.modalEditShow = true
        },
        deleteData(id){
            this.$swal.fire({
                title: 'Apakah anda yakin untuk menghapus data ini?',
                text: 'Menghapus data barang akan berpengaruh ke data transaksi yang terkait dengan outlet ini',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Ya',
            }).then((result) => {
                if (result.isConfirmed) {
                    $axios.delete(`/operator/products/${id}`)
                    .then(response => {
                        this.$toastr.s("Berhasil menghapus barang");
                        this.getPaginateDataProducts()
                    }).catch(error => {
                        error.map(message => {
                            this.$toastr.e(message);
                        })
                    })
                }
            })
        },
        handleOk(bvModalEvt){
            bvModalEvt.preventDefault()
            this.submitAddFormData()
        },
        handleOkEdit(bvModalEvt){
            bvModalEvt.preventDefault()
            this.submitEditFormData()
        },
        submitAddFormData(){
            $axios.post(`/operator/products`, this.formData)
            .then((response) => {
                this.$toastr.s("Berhasil menambahkan barang");
                this.getPaginateDataProducts()
                this.modalShow = false
                this.resetForm()
            })
            .catch((error) => {
                error.map(message => {
                    this.$toastr.e(message);
                })
            })
        },
        submitEditFormData(){
            $axios.patch(`/operator/products/${this.formDataEdit.id}`, this.formDataEdit)
            .then((response) => {
                this.$toastr.s("Berhasil mengubah barang");
                this.getPaginateDataProducts()
                this.modalEditShow = false
                this.resetForm()
            })
            .catch((error) => {
                error.map(message => {
                    this.$toastr.e(message);
                })
            })
        }
    },
    watch: {
      page() {
        this.getPaginateDataProducts()
      },
      keyword() {
        this.getPaginateDataProducts()
      }
   },
}
</script>