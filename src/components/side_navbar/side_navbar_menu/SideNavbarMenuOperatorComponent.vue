<template>
    <div>
        <li class="nav-item">
            <router-link :to="{name:'operator.home'}" class="nav-link" active-class="active">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="ni ni-cart text-danger text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Transaksi Baru</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name:'operator.items'}" class="nav-link" active-class="active">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="ni ni-collection text-primary text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Data Barang</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name:'operator.outlets'}" class="nav-link" active-class="active">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="ni ni-shop text-success text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Data Outlet</span>
            </router-link>
        </li>
        <li class="nav-item">
            <router-link :to="{name:'operator.operators'}" class="nav-link" active-class="active">
                <div class="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
                </div>
                <span class="nav-link-text ms-1">Data Opertor</span>
            </router-link>
        </li>
    </div>
</template>