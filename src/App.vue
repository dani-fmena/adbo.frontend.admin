<template>
    <div id="nav">
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/default">Default</router-link>
    </div>
    <component :is="this.$route.meta.layout || 'div'">
        <router-view/>
    </component>
</template>


<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'App',
        mounted () {
            document.body.classList.add('dark-edition')
        },
    })
</script>


<style lang="scss">
    @import "assets/css/nucleo-icons.css";
    @import "assets/sass/black-dashboard";
    /*@import '../node_modules/bootstrap/scss/bootstrap.scss';*/
</style>
