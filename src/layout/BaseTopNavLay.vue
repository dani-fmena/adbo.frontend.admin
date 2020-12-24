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

            <!-- TODO animation is missing, watch https://github.com/BinarCode/vue2-transitions/issues/42 for including the lib -->
            <!-- ELEMENTS -->
            <div class="collapse navbar-collapse show" v-show="showMenu">
                <ul class="navbar-nav ml-auto">

                    <!-- SEARCH COMPONENT -->
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

                    <!-- BUTTONS -->

                    <!-- NOTIFICATIONS BTN DROPDOWN -->
                    <dropdown-comp tag="li" class="nav-item" title-tag="a" :menu-on-right="true">
                        <template v-slot:title>
                            <a href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true">
                                <div class="notification d-none d-lg-block d-xl-block"></div>
                                <i class="tim-icons icon-sound-wave"></i>
                                <p class="d-lg-none">
                                    New Notifications
                                </p>
                            </a>
                        </template>

                        <!-- Notifications -->
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">Mike John responded to your email</a>
                        </li>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">You have 5 more tasks</a>
                        </li>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">Another notification</a>
                        </li>
                    </dropdown-comp>

                    <!--  -->
                    <dropdown-comp tag="li" class="nav-item" title-tag="a" menu-classes="dropdown-navbar" :menu-on-right="true">
                        <template v-slot:title>
                            <a slot="title" href="#" class="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="true">
                                <div class="photo"><img src="../assets/imgs/anime3.png"></div>
                                <b class="caret d-none d-lg-block d-xl-block"></b>
                                <p class="d-lg-none">
                                    Log out
                                </p>
                            </a>
                        </template>

                        <!-- Menu Links -->
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">Profile</a>
                        </li>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item">Settings</a>
                        </li>
                        <div class="dropdown-divider"></div>
                        <li class="nav-link">
                            <a href="#" class="nav-item dropdown-item" v-on:click="handleLogOutIntent">Log out</a>
                        </li>
                    </dropdown-comp>

                </ul>
            </div>

        </div>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { ModalComp, DropdownComp } from '../components'
    import { PATHS } from '@/router/paths'


    interface INavData {
        activeNotifications: boolean,
        showMenu: boolean,
        searchModalVisible: boolean,
        searchQuery: string
    }

    export default defineComponent({
        name: 'BaseTopNavLay',
        components: {
            ModalComp,
            DropdownComp
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
                const { cname } = this.$route.params            // Translation Name of the Route, this is used when we need to specify a name programmatically

                if (cname !== undefined && typeof cname === "string") return cname

                return name as string
            }
        },
        methods: {
            //region ======== HANDLERS ==============================================================
            handleLogOutIntent (): void {
                // TODO quita el token, trata de poner ambos metodos (quitar y poner en un servicio del auth)
                this.$router.push(PATHS.login)
                console.log('logout clicked')
            },
            // TODO review these unused methods
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

            //region ======== HELPERS ===============================================================
            capitalizeFirstLetter (text: string): string {
                return text.charAt(0).toUpperCase() + text.slice(1);
            },
            //endregion =============================================================================
        }
    })
</script>

<style scoped>
</style>
