<template>
    <component :is="this.$route.meta.layout || 'div'">
        <router-view/>
    </component>
</template>


<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'Application',
    })
</script>


<style lang="scss">
    @import "assets/css/nucleo-icons.css";
    @import "assets/sass/black-dashboard";
    /*@import '../node_modules/bootstrap/scss/bootstrap.scss';*/
</style>
