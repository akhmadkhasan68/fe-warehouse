<template>
    <div>
        <div class="row mb-3">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 font-weight-bold">Transaksi Masuk Hari Ini</p>
                                    <h5 class="font-weight-bolder">
                                        +30
                                    </h5>
                                    <p class="mb-0">
                                        <span class="text-success text-sm font-weight-bolder">+2%</span>
                                        Transaksi Kemarin
                                    </p>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-success shadow-success text-center rounded-circle">
                                    <i class="ni ni-bold-right text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body p-3">
                        <div class="row">
                            <div class="col-8">
                                <div class="numbers">
                                    <p class="text-sm mb-0 font-weight-bold">Transaksi Keluar Hari Ini</p>
                                    <h5 class="font-weight-bolder">
                                        +30
                                    </h5>
                                    <p class="mb-0">
                                        <span class="text-danger text-sm font-weight-bolder">-2%</span>
                                        Transaksi Kemarin
                                    </p>
                                </div>
                            </div>
                            <div class="col-4 text-end">
                                <div class="icon icon-shape bg-gradient-danger shadow-success text-center rounded-circle">
                                    <i class="ni ni-bold-left text-lg opacity-10" aria-hidden="true"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <router-link :to="{name:'operator.transactions.in'}" class="btn btn-outline-primary btn-lg w-100" exact-active-class="active text-white" type="button">Transaksi Masuk</router-link>
            </div>
            <div class="col-lg-6">
                <router-link :to="{ name:'operator.transactions.out' }" class="btn btn-outline-primary btn-lg w-100" exact-active-class="active text-white" type="button">Transakasi Keluar</router-link>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>