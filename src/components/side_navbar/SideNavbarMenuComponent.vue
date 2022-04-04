<template>
    <div class="collapse navbar-collapse w-auto " id="sidenav-collapse-main">
        <ul class="navbar-nav">
            <side-navbar-menu-admin v-if="$route.meta.role == 'admin'"/>
            <side-navbar-menu-operator v-if="$route.meta.role == 'operator'"/>
        </ul>
    </div>
</template>
<script>
import SideNavbarMenuAdmin from '@/components/side_navbar/side_navbar_menu/SideNavbarMenuAdminComponent.vue'
import SideNavbarMenuOperator from '@/components/side_navbar/side_navbar_menu/SideNavbarMenuOperatorComponent.vue'
export default {
    components:{
        SideNavbarMenuAdmin,
        SideNavbarMenuOperator
    }
}
</script>