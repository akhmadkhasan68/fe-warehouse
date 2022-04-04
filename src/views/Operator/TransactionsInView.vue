<template>
    <div>
        <div class="row">
            <div class="col-lg-12">
                <div class="card ">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Nama Operator</label>
                                    <b-form-select
                                    class="form-control"
                                    id="input-3"
                                    :options="operatorOptions"
                                    required
                                    ></b-form-select>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="form-group">
                                    <label for="example-text-input" class="form-control-label">Tanggal</label>
                                    <flat-pickr class="form-control" v-model="date"></flat-pickr>
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
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Harga</th>
                                                <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">Jumlah</th>
                                                <th class="text-secondary opacity-7"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-if="itemForms.length < 1">
                                                    <td colspan="5">
                                                        <center>
                                                            <span class="text-sm">Belum Ada Item</span>
                                                        </center>
                                                    </td>
                                                </tr>
                                                <tr v-else v-for="(item, key) in itemForms" :key="key">
                                                    <td>
                                                        <b-form-select
                                                        class="form-control"
                                                        id="input-3"
                                                        :options="operatorOptions"
                                                        required
                                                        ></b-form-select>
                                                    </td>
                                                    <td>
                                                        <p class="text-xs font-weight-bold mb-0">{{ item.avg_price }}</p>
                                                    </td>
                                                    <td>
                                                        <div class="input-group">
                                                            <input class="form-control" placeholder="Masukkan Harga" type="text" :value="item.price">
                                                            <span class="input-group-text">@Kg</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div class="input-group">
                                                            <input class="form-control" placeholder="Masukkan Jumlah" type="text" :value="item.quantity">
                                                            <span class="input-group-text">/Kg</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <a style="cursor:pointer;" @click="deleteItem(key)" class="text-danger font-weight-bold" data-toggle="tooltip" data-original-title="Hapus Item Ini">
                                                            <font-awesome-icon icon="trash" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colspan="5">
                                                        <button @click="addItem()" class="btn btn-outline-primary btn-md w-100"><font-awesome-icon icon="plus" /> Tambah</button>
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
                    <font-awesome-icon icon="check"/> Simpan
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return {
            date: new Date(),
            itemForms: [
                {
                    item_id: "",
                    avg_price: 0,
                    price: 0,
                    quantity: 0
                }
            ]
        }
    },
    created() {
        this.getDataOperators().then(response => {
            console.log(response)
        }).catch(err => console.log(err))
    },
    computed:{
        ...mapState('operators', {
            dataOperators: state => state.dataOperators
        }),
        operatorOptions(){
            let options =  []
            this.dataOperators.map(data => {
                options.push({
                    value: data.id,
                    text: data.name
                })
            });

            return options
        }
    },
    methods:{
        ...mapActions('operators', ['getDataOperators']),
        addItem(){
            this.itemForms.push({
                item_id: "",
                avg_price: 0,
                price: 0,
                quantity: 0
            })
        },
        deleteItem(index)
        {
            this.itemForms.splice(index, 1);
        },
        saveAll(){
            console.log(this.itemForms);
        }
    }
}
</script>