<template>
    <div></div>
    <div class="content">
        <div>TOP NAV BAR</div>
        <slot/>
    </div>
    <footer-content/>
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
