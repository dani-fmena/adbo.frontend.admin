import { reactive } from 'vue'
import SidebarPlugComp from './SidebarPlugComp.vue'
import SidebarGroupPlugComp from './SidebarGroupPlugComp.vue'
import SidebarLinkPlugComp from './SidebarLinkPlugComp.vue'


interface ISideBarStore {
    showSidebar: boolean,
    sidebarLinks: typeof SidebarLinkPlugComp[],
    displaySidebar (value: boolean): void
}

// tiny internal plugin store
const SidebarStore = reactive<ISideBarStore>({
    showSidebar: false,
    sidebarLinks: [],
    displaySidebar (value: boolean) {
        this.showSidebar = value
    }
})

const SidebarPlugin = {
    install (app: any) {
    
        app.config.globalProperties.$sidebar = SidebarStore
        app.component('sidebar-plug-comp', SidebarPlugComp)
        app.component('sidebar-group-plug-comp', SidebarGroupPlugComp)
        app.component('sidebar-link-plug-comp', SidebarLinkPlugComp)
    }
}

export default SidebarPlugin
