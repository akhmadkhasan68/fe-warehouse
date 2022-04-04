<template>
    <div>
        <main class="main-content  mt-0">
            <div class="page-header min-vh-100" style="background-image: url('../../../assets/img/illustrations/404.svg');">
            <div class="container">
                <div class="row justify-content-center">
                <div class="col-lg-6 col-md-7 mx-auto text-center">
                    <h1 class="display-1 text-bolder text-primary">Error 404</h1>
                    <h2>Mohon maaf, alamat tidak dapat ditemukan</h2>
                    <router-link :to="{ name: 'home'}" type="button" class="btn bg-gradient-dark mt-4">Go to Homepage</router-link>
                </div>
                </div>
            </div>
            </div>
        </main>
    </div>
</template>