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
                                        <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-center">Total Transaksi Barang</th>
                                        <th class="text-secondary opacity-7"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="dataPaginateOperators.data.length == 0">
                                        <td colspan="3" class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">Data Kosong!</p>
                                        </td>
                                    </tr>
                                    <tr v-for="(data, key) in dataPaginateOperators.data" :key="key" v-else>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ key+1 }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.name }}</p>
                                        </td>
                                        <td class="align-middle text-center">
                                            <p class="text-xs font-weight-bold mb-0">{{ data.transactions.length }}</p>
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
                    :total-rows="dataPaginateOperators.total"
                    :per-page="dataPaginateOperators.per_page"
                    aria-controls="dataPaginateOperators"
                    v-if="dataPaginateOperators && dataPaginateOperators.data.length > 0"
                    ></b-pagination>
                </div>
            </div>
        </div>

        <b-modal 
            ref="modal"
            size="lg"
            v-model="modalShow"
            title="Tambah Data Operator"
            @ok="handleOk">

            <form id="myFormAdd" @submit.stop.prevent="submitAddFormData">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Nama Operator:</label>
                    <input type="text" class="form-control" v-model="formData.name" :reduce="data => {data.value}" placeholder="Masukkan Nama Operator">
                </div>
            </form>
        </b-modal>

        <b-modal 
            ref="modal"
            size="lg"
            v-model="modalEditShow"
            title="Edit Data Operator"
            @ok="handleOkEdit">
            <form id="myFormAdd" @submit.stop.prevent="submitEditFormData">
                <input type="hidden" v-model="formDataEdit.id">
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Nama Operator:</label>
                    <input type="text" class="form-control" v-model="formDataEdit.name" :reduce="data => {data.value}" placeholder="Masukkan Nama Operator">
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
                name: "",
            },
            formDataEdit: {
                name: "",
                id: ""
            },
            modalShow: false,
            modalEditShow: false
        }
    },
    created() {
        this.getPaginateDataOperators()
    },
    computed:{
        ...mapState('operators', {
            dataPaginateOperators: state => state.dataPaginateOperators,
            page: state => state.page,
            keyword: state => state.keyword
        }),
        page: {
            get() {
                return this.$store.state.operators.page
            },
            set(val) {
                this.$store.commit('operators/SET_PAGE', val)
            }
        },
        keyword: {
            get() {
                return this.$store.state.operators.keyword
            },
            set(val) {
                this.$store.commit('operators/SET_KEYWORD', val)
            }
        }
    },
    methods:{
        ...mapActions('operators', ['getPaginateDataOperators']),
        resetForm(){
            this.formData = {
                name: ""
            }
        },
        resetFormEdit(){
            this.formDataEdit = {
                name: "",
                id: "",
            }
        },
        editData(data){
            this.formDataEdit = {
                name: data.name,
                id: data.id
            }
            this.modalEditShow = true
        },
        deleteData(id){
            this.$swal.fire({
                title: 'Apakah anda yakin untuk menghapus data ini?',
                text: 'Menghapus data operator akan berpengaruh ke data transaksi yang terkait dengan operator ini',
                showDenyButton: false,
                showCancelButton: true,
                confirmButtonText: 'Ya',
            }).then((result) => {
                if (result.isConfirmed) {
                    $axios.delete(`/operator/operators/${id}`)
                    .then(response => {
                        this.$toastr.s("Berhasil menghapus operator");
                        this.getPaginateDataOperators()
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
            $axios.post(`/operator/operators`, this.formData)
            .then((response) => {
                this.$toastr.s("Berhasil menambahkan operator");
                this.getPaginateDataOperators()
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
            $axios.patch(`/operator/operators/${this.formDataEdit.id}`, this.formDataEdit)
            .then((response) => {
                this.$toastr.s("Berhasil mengubah operator");
                this.getPaginateDataOperators()
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
        this.getPaginateDataOperators()
      },
      keyword() {
        this.getPaginateDataOperators()
      }
   },
}
</script>