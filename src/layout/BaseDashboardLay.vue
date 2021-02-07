<template>

    <!-- SIDEBAR -->
    <sidebar-plug-comp :autoClose="true">
        <template v-slot:links>

            <sidebar-link-plug-comp :to="{ name: rnDashboard }" :name="$t('routes.' + rnDashboard)" icon="tim-icons icon-chart-pie-36" :sub="false"/>
            <sidebar-link-plug-comp :to="{ name: rnCatalog }" :name="$t('routes.' + rnCatalog)" icon="tim-icons icon-components" :sub="false"/>

            <!-- USERS -->
            <sidebar-group-plug-comp :name="$t('routes.' + rnUsers)" icon="tim-icons icon-chart-pie-36">
                <template v-slot:sublinks>
                    <sidebar-link-plug-comp :to="{ name: rnUsers }" :name="$t('routes.' + rnUsers)" icon="U"/>
                    <sidebar-link-plug-comp :to="{ name: rnRoles }" :name="$t('routes.' + rnRoles)" icon="R"/>
                </template>
            </sidebar-group-plug-comp>

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
    import { PATH_NAMES } from '@/services/definitions/route-paths'
    import PerfectScrollbar from 'perfect-scrollbar'
    import FooterContent from './FooterContentLay.vue'
    import BaseTopNavLay from './BaseTopNavLay.vue'


    interface IRouteNames {
        rnDashboard: string,
        rnUsers: string
        rnCatalog: string,
        rnRoles: string,
    }

    export default defineComponent({
        name: 'BaseDashboardLay',
        data () : IRouteNames {
            return {
                rnDashboard: PATH_NAMES.dashboard,
                rnCatalog: PATH_NAMES.catalogs,
                rnUsers: PATH_NAMES.users,
                rnRoles: PATH_NAMES.roles,
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
