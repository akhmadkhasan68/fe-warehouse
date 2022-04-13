<template>
    <div>
        <div class="row mb-3">
            <div class="col-lg-12">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-lg-6">
                                <router-link :to="{name:'operator.transactions.in'}" class="btn btn-outline-primary btn-lg w-100" exact-active-class="active text-white" type="button">Transaksi Masuk</router-link>
                            </div>
                            <div class="col-lg-6">
                                <router-link :to="{ name:'operator.transactions.out' }" class="btn btn-outline-primary btn-lg w-100" exact-active-class="active text-white" type="button">Transakasi Keluar</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <router-view></router-view>
    </div>
</template>