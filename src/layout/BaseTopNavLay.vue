<template>
    <nav class="navbar navbar-expand-lg navbar-absolute"
         :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">

        <div class="container-fluid">
            <div class="navbar-wrapper">

            </div>
        </div>


    </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { ModalComp } from '../components'


    interface INavData {
        activeNotifications: boolean,
        showMenu: boolean,
        searchModalVisible: boolean,
        searchQuery: string
    }

    export default defineComponent({
        name: 'BaseTopNavLay',
        components: {
            ModalComp
        },
        data (): INavData {
            return {
                activeNotifications: false,
                showMenu: false,
                searchModalVisible: false,
                searchQuery: ''
            }
        }
    })
</script>

<style scoped>

</style>
