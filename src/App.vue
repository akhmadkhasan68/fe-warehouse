<template>
  <div>
    <div v-if="$route.meta.errorNotFound">
      <router-view></router-view>
    </div>
    <div v-else>
      <div class="min-height-150 bg-primary position-absolute w-100"></div>
      <side-navbar-component/>
      <main class="main-content position-relative border-radius-lg">
        <navbar-component/>
        <div class="container-fluid py-4">
          <router-view></router-view>
          <footer-component/>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import SideNavbarComponent from '@/components/side_navbar/SideNavbarComponent.vue'
import NavbarComponent from '@/components/navbar/NavbarComponent.vue'
import FooterComponent from '@/components/footer/FooterComponent.vue'
export default {
  components: {
    SideNavbarComponent,
    NavbarComponent,
    FooterComponent
  },
}
</script>
