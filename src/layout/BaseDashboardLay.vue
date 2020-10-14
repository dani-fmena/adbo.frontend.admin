<template>

    <!-- SIDEBAR -->
    <side-bar-plug-comp>
    </side-bar-plug-comp>

    <div class="main-panel">
        <!-- NAV BAR -->
        <base-top-nav-lay>
        </base-top-nav-lay>

        <!-- CONTENT -->
        <div class="content">
            <slot />
        </div>

        <!-- FOOTER -->
        <footer-content/>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import FooterContent from './FooterContentLay.vue'
    import BaseTopNavLay from './BaseTopNavLay.vue'

    export default defineComponent({
        name: 'BaseDashboardLay',
        components: {
            FooterContent,
            BaseTopNavLay
        }
    })
</script>
