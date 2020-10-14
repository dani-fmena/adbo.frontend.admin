import SidebarPlugComp from './SidebarPlugComp.vue'
import SidebarLinkPlugComp from './SidebarLinkPlugComp.vue'
import { reactive } from 'vue'

// tiny internal plugin store
const SidebarStore = reactive({
    showSidebar: false,
    sidebarLinks: [],
    displaySidebar (value: boolean) {
        this.showSidebar = value
    }
})

const SidebarPlugin = {
    install (app: any) {
    
        app.config.globalProperties.$sidebar = SidebarStore
        app.component('side-bar-plug-comp', SidebarPlugComp)
        app.component('sidebar-link-plug-comp', SidebarLinkPlugComp)
    }
}

export default SidebarPlugin

