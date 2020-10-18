<template>
    <component :is="this.$route.meta.layout || 'div'">
        <router-view></router-view>
        <!--<router-view :key="$route.fullPath"></router-view>-->
    </component>
</template>


<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'Application',
        methods: {
            toggleNavOpen () {
                let root = document.getElementsByTagName('html')[0]
                root.classList.toggle('nav-open')
            }
        },
        watch: {
            '$sidebar.showSidebar': function() {            // this function receive two parameters: newValue and oldValue
                this.toggleNavOpen()
            }
        }
    })

</script>


<style lang="scss">
    @import "assets/sass/black-dashboard";
    @import "assets/css/fontawesome5.css";
    @import "assets/css/nucleo-icons.css";

    /*@import '../node_modules/bootstrap/scss/bootstrap.scss';*/
</style>
