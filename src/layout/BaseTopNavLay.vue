<template>
    <nav class="navbar navbar-expand-lg navbar-absolute"
         :class="{'bg-white': showMenu, 'navbar-transparent': !showMenu}">
        <div class="container-fluid">

            <!-- KEBAB & BURGER BUTTONS -->
            <div class="navbar-wrapper">
                <div class="navbar-toggle d-inline" :class="{toggled: $sidebar.showSidebar}">
                    <button type="button"
                            class="navbar-toggler"
                            aria-label="Navbar toggle button"
                            @click.prevent="handleSidebarToggle">
                        <span class="navbar-toggler-bar bar1"></span>
                        <span class="navbar-toggler-bar bar2"></span>
                        <span class="navbar-toggler-bar bar3"></span>
                    </button>
                </div>
                <a class="navbar-brand" href="#">{{routeName}}</a>
            </div>
            <button class="navbar-toggler" type="button"
                    @click="handleMenuToggle"
                    data-toggle="collapse"
                    data-target="#navigation"
                    aria-controls="navigation-index"
                    aria-label="Toggle navigation">
                <span class="navbar-toggler-bar navbar-kebab"></span>
                <span class="navbar-toggler-bar navbar-kebab"></span>
                <span class="navbar-toggler-bar navbar-kebab"></span>
            </button>

            <!-- ELEMENTS -->
            <div class="collapse navbar-collapse show" v-show="showMenu">
                <ul class="navbar-nav ml-auto">

                    <!-- SEARCH COMPONENTS -->
                    <div class="search-bar input-group" @click="searchModalVisible = true">
                        <button class="btn btn-link" id="search-button" data-toggle="modal" data-target="#searchModal">
                            <i class="tim-icons icon-zoom-split"></i>
                        </button>
                    </div>
                    <modal-comp v-model:show="searchModalVisible"
                                class="modal-search"
                                id="searchModal"
                                :centered="false"
                                :show-close="true">
                        <template v-slot:header>
                            <input v-model="searchQuery" type="text" class="form-control" id="inlineFormInputGroup" placeholder="SEARCH">
                        </template>
                    </modal-comp>

                </ul>
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
        },
        computed: {
            routeName (): string {
                const { name } = this.$route
                return this.capitalizeFirstLetter(name as string)
            }
        },
        methods: {
            //region ======== HANDLERS ==============================================================
            handleNotificationDropDown (): void {
                this.activeNotifications = !this.activeNotifications    // toggle
            },
            handleCloseNotificationDropDown (): void {
                this.activeNotifications = false
            },
            handleSidebarToggle (): void {
                //@ts-ignore
                this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
            },
            handleHideSideBar (): void {
                //@ts-ignore
                this.$sidebar.displaySidebar(false)
            },
            handleMenuToggle (): void {
                this.showMenu = !this.showMenu
            },
            //endregion =============================================================================

            //region ======== AUX ===================================================================
            capitalizeFirstLetter (text: string): string {
                return text.charAt(0).toUpperCase() + text.slice(1);
            },
            //endregion =============================================================================
        }
    })
</script>

<style scoped>

</style>
