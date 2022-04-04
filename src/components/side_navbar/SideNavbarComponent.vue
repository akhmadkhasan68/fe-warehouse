<template>
    <aside class="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4 " id="sidenav-main">
        <side-navbar-header/>
        <hr class="horizontal dark mt-0">
        <side-navbar-menu/>
        <div class="sidenav-footer mx-3">
            <router-link :to="{name:'admin.home'}" class="btn btn-dark btn-sm w-100 mb-3" type="button" v-if="$route.meta.role == 'operator'">Aplikasi Dashboard</router-link>
            <router-link :to="{ name:'operator.home' }" class="btn btn-primary btn-sm w-100 mb-3" type="button" v-if="$route.meta.role == 'admin'">Aplikasi Operator</router-link>
        </div>
    </aside>
</template>
<script>
import SideNavbarHeader from '@/components/side_navbar/SideNavbarHeaderComponent.vue'
import SideNavbarMenu from '@/components/side_navbar/SideNavbarMenuComponent.vue'
export default {
    components:{
        SideNavbarHeader,
        SideNavbarMenu
    },
    data(){
        return{
            "name": "Hasan"
        }
    }
}
</script>