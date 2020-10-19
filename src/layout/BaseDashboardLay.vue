<template>

    <!-- SIDEBAR -->
    <side-bar-plug-comp>
        <template v-slot:links>
            <sidebar-link-plug-comp :to="{ name: nDashboard }" :name="nDashboard" icon="tim-icons icon-chart-pie-36" />
            <sidebar-link-plug-comp :to="{ name: nCatalog }" :name="nCatalog" icon="tim-icons icon-components" />
        </template>
    </side-bar-plug-comp>

    <div class="main-panel">
        <!-- NAV BAR -->
        <base-top-nav-lay>
        </base-top-nav-lay>

        <!-- CONTENT -->
        <div class="content">
            <slot></slot>
        </div>

        <!-- FOOTER -->
        <footer-content/>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { PATHS } from '@/router/paths'
    import PerfectScrollbar from 'perfect-scrollbar'
    import FooterContent from './FooterContentLay.vue'
    import BaseTopNavLay from './BaseTopNavLay.vue'


    interface IRouteNames {
        nDashboard: string,
        nCatalog: string,
    }

    export default defineComponent({
        name: 'BaseDashboardLay',
        data () : IRouteNames {
            return {
                nDashboard: PATHS.dashboard,
                nCatalog: PATHS.catalogs
            }
        },
        components: {
            FooterContent,
            BaseTopNavLay
        },
        mounted (): void {
            new PerfectScrollbar('.main-panel')
        }
    })
</script>
