<template>
    <component :is="this.$route.meta.layout || 'div'">
        <router-view />
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
            '$sidebar.showSidebar': function() {
                this.toggleNavOpen()
            }
        }
        /*mounted () {
            //@ts-ignore
            this.$watch('$sidebar.showSidebar', this.toggleNavOpen)
            // FIXME fix this 👆🏽 , the click method change the object but the watch doesn't get fired
        }*/
    })

</script>


<style lang="scss">
    @import "assets/sass/black-dashboard";
    @import "assets/css/fontawesome5.css";
    @import "assets/css/nucleo-icons.css";

    /*@import '../node_modules/bootstrap/scss/bootstrap.scss';*/
</style>
