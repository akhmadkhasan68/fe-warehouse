<template>
    <nav class="navbar navbar-main navbar-expand-lg  px-0 mx-4 shadow-none border-radius-xl z-index-sticky " id="navbarBlur" data-scroll="false">
      <div class="container-fluid py-1 px-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
                <li class="breadcrumb-item text-sm text-white opacity-5" v-if="$route.meta.subtitle != null">
                    {{ $route.meta.subtitle }}
                </li>
                <li class="breadcrumb-item text-sm text-white active" aria-current="page">{{ $route.meta.title }}</li>
            </ol>
            <!-- <h6 class="font-weight-bolder mb-0 text-white">{{ $route.meta.title }}</h6> -->
        </nav>
        <div class="sidenav-toggler sidenav-toggler-inner d-xl-block d-none " @click="collapseSideBar">
          <a href="javascript:;" class="nav-link p-0">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line bg-white"></i>
              <i class="sidenav-toggler-line bg-white"></i>
              <i class="sidenav-toggler-line bg-white"></i>
            </div>
          </a>
        </div>
        <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
          <div class="ms-md-auto pe-md-3 d-flex align-items-center">
            
          </div>
          <ul class="navbar-nav  justify-content-end">
            <li class="nav-item d-xl-none ps-3 d-flex align-items-center" @click="collapseSideBarResponsive">
              <a href="javascript:;" class="nav-link text-white p-0" id="iconNavbarSidenav">
                <div class="sidenav-toggler-inner">
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                  <i class="sidenav-toggler-line bg-white"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data(){
        return{
            
        }
    },
    methods:{
      ...mapActions('auth', ['logoutSubmit']),
      logout(){
          this.$swal.fire({
              title: 'Apakah anda yakin ingin meninggalkan program ini?',
              showDenyButton: false,
              showCancelButton: true,
              confirmButtonText: 'Ya',
              denyButtonText: `Batal`,
          }).then((result) => {
              if (result.isConfirmed) {
                this.logoutSubmit().then(response => {
                  if(response){
                    this.$swal.fire('Selamat anda berhasil logout', '', 'success')
                    this.$router.push({ name: 'login' })
                  }
                })
              }
          })
      },
      collapseSideBar(){
          if (document.querySelector('.sidenav-toggler')) {
              var sidenavToggler = document.getElementsByClassName('sidenav-toggler')[0];
              var sidenavShow = document.getElementsByClassName('g-sidenav-show')[0];
              var toggleNavbarMinimize = document.getElementById('navbarMinimize');

              if (sidenavShow) {
                  sidenavToggler.onclick = function() {
                      if (!sidenavShow.classList.contains('g-sidenav-hidden')) {
                      sidenavShow.classList.remove('g-sidenav-pinned');
                      sidenavShow.classList.add('g-sidenav-hidden');
                      if (toggleNavbarMinimize) {
                          toggleNavbarMinimize.click();
                          toggleNavbarMinimize.setAttribute("checked", "true");
                      }
                      } else {
                      sidenavShow.classList.remove('g-sidenav-hidden');
                      sidenavShow.classList.add('g-sidenav-pinned');
                      if (toggleNavbarMinimize) {
                          toggleNavbarMinimize.click();
                          toggleNavbarMinimize.removeAttribute("checked");
                      }
                      }
                  };
              }
          }
      },
      collapseSideBarResponsive()
      {
          if (document.querySelector('.sidenav-toggler')) {
              var sidenavToggler = document.getElementsByClassName('sidenav-toggler')[0];
              sidenavToggler.click();
          }
      }
    }
}
</script>