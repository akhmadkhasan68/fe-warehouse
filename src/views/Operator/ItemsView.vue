<template>
    <div>
        <!-- <div class="row">
            <div class="col-lg-12">
                <div class="card shadow">
                    <div class="card-body">
                        <div class="row mb-3">
                            <div class="col-lg-2">
                                <button class="btn bg-gradient-primary w-100" type="button" data-bs-toggle="modal" data-bs-target="#formAddModal">
                                    <font-awesome-icon icon="plus"/> Tambah
                                </button>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="table-responsive">
                                    <table class="table align-items-center mb-0">
                                        <thead>
                                            <tr>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Nama Barang</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Kategori</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Satuan</th>
                                                <th class="text-secondary opacity-7"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td class="text-center">
                                                    Telur
                                                </td>
                                                <td class="text-center">
                                                    Stock
                                                </td>
                                                <td class="text-center">
                                                    Kg
                                                </td>
                                                <td class="text-center">
                                                    <a href="" class="text-success font-weight-bold mx-3" data-toggle="tooltip" data-original-title="Edit user">
                                                        <font-awesome-icon icon="edit" />
                                                    </a>
                                                    <a href="" class="text-danger font-weight-bold" data-toggle="tooltip" data-original-title="Edit user">
                                                        <font-awesome-icon icon="trash" />
                                                    </a>
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
        </div> -->

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
                    <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#formAddModal">
                        <i class="fa fa-plus"></i> Tambah
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-12 col-xl-12">
                    <div class="card">
                        <div class="table-responsive">
                            <table class="table align-items-center mb-0">
                                <thead>
                                    <tr>
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Nama</th>
                                        <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(data, key) in dataPaginateItems.data" :key="key">
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.name }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <a href="javascript:;" class="btn btn-success btn-sm mx-1 font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit Data">
                                                <i class="fa fa-pencil"></i> Edit
                                            </a>
                                            <a href="javascript:;" class="btn btn-danger btn-sm mx-1 font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete Data">
                                                <i class="fa fa-trash"></i> Delete
                                            </a>
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
                    :total-rows="dataPaginateItems.total"
                    :per-page="dataPaginateItems.per_page"
                    aria-controls="dataPaginateItems"
                    v-if="dataPaginateItems && dataPaginateItems.data.length > 0"
                    ></b-pagination>
                </div>
            </div>
        </div>
        <div class="modal fade" id="formAddModal" tabindex="-1" role="dialog" aria-labelledby="formAddModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="formAddModalLabel">Tambah Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                    </button>
                </div>
                <form id="myFormAdd" @submit.prevent="submitAddFormData">
                    <div class="modal-body">
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Nama Barang:</label>
                        <input type="text" class="form-control" v-model="formData.name" :reduce="data => {data.value}" placeholder="Masukkan Nama Barang">
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Kategori Barang:</label>
                        <b-form-select
                        class="form-control"
                        id="input-3"
                        v-model="formData.category_id"
                        :options="categoriesOptions"
                        required
                        ></b-form-select>
                    </div>
                    <div class="form-group">
                        <label for="message-text" class="col-form-label">Satuan:</label>
                        <b-form-select
                        class="form-control"
                        id="input-3"
                        v-model="formData.unit_id"
                        :options="unitsOptions"
                        required
                        ></b-form-select>
                    </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn bg-gradient-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn bg-gradient-primary">Submit</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import $axios from "../../services/api"
import $ from 'jquery';

export default {
    data(){
        return {
            formData: {
                category_id: "",
                unit_id: "",
                name: ""
            }
        }
    },
    created() {
        this.getDataUnits()
        this.getDataCategories()
        this.getPaginateDataItems()
    },
    computed:{
        ...mapState('units', {
            dataUnits: state => state.dataUnits
        }),
        ...mapState('categories', {
            dataCategories: state => state.dataCategories
        }),
        ...mapState('items', {
            dataPaginateItems: state => state.dataPaginateItems,
            page: state => state.page
        }),
        unitsOptions(){
            let options =  []
            this.dataUnits.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
        categoriesOptions(){
            let options =  []
            this.dataCategories.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        },
        page: {
            get() {
                return this.$store.state.items.page
            },
            set(val) {
                this.$store.commit('items/SET_PAGE', val)
            }
        }
    },
    methods:{
        ...mapActions('units', ['getDataUnits']),
        ...mapActions('categories', ['getDataCategories']),
        ...mapActions('items', ['getPaginateDataItems']),
        submitAddFormData(){
            let formData = {
                "name" : this.formData.name,
                "category_id" : this.formData.category_id,
                "unit_id" : this.formData.unit_id,
            }
            $axios.post(`/operator/products`, formData)
            .then((response) => {
                console.log(response)
                this.$toastr.s("Berhasil menambahkan items");
                this.getPaginateDataItems()
                $("#formAddModal").modal('hide')
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
         this.getPaginateDataItems()
      }
   },
}
</script>