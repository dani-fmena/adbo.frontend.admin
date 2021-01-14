<template>

    <!-- SIDEBAR -->
    <sidebar-plug-comp>
        <template v-slot:links>

            <sidebar-link-plug-comp :to="{ name: nDashboard }" :name="nDashboard" icon="tim-icons icon-chart-pie-36" :sub="false"/>
            <sidebar-link-plug-comp :to="{ name: nCatalog }" :name="nCatalog" icon="tim-icons icon-components" :sub="false"/>

            <!-- USERS -->
            <sidebar-group-plug-comp name="Users" icon="tim-icons icon-chart-pie-36">
                <template v-slot:sublinks>
                    <sidebar-link-plug-comp :to="{ name: nCatalog }" :name="nCatalog" icon="B"/>
                    <sidebar-link-plug-comp :to="{ name: nCatalog }" :name="nCatalog" icon="A"/>
                </template>
            </sidebar-group-plug-comp>

            <sidebar-link-plug-comp :to="{ name: nDashboard }" :name="nDashboard" icon="tim-icons icon-chart-pie-36" :sub="false"/>

        </template>
    </sidebar-plug-comp>

    <div id="topper-border-cont" class="main-panel mp-stylized">
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
    import { PATH_NAMES } from '@/router/paths'
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
                nDashboard: PATH_NAMES.dashboard,
                nCatalog: PATH_NAMES.catalogs
            }
        },
        components: {
            FooterContent,
            BaseTopNavLay
        },
        mounted (): void {
            new PerfectScrollbar('#topper-border-cont')
        }
    })
</script>
