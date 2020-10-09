<template>
    <div class="main-panel">

        <!-- CONTENT -->
        <div class="content-page">
            <slot />
        </div>

        <!-- FOOTER -->
        <footer-content/>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import FooterContent from './FooterContentLay.vue'

    export default defineComponent({
        name: 'BaseDashboardLay',
        components: {
            FooterContent
        }
    })
</script>
