import SidebarPlugComp from './SidebarPlugComp.vue'
import SidebarLinkPlugComp from './SidebarLinkPlugComp.vue'


// tiny internal plugin store
const SidebarStore = {
    showSidebar: false,
    sidebarLinks: [],
    displaySidebar (value: boolean) {
        this.showSidebar = value
    }
}

const SidebarPlugin = {
    install (vueObj: any) {
        
        /*let app = new vueObj({
            data: {
                sidebarStore: SidebarStore
            }
        })*/
    
        vueObj.config.globalProperties.$sidebar = { ...SidebarStore }
        vueObj.component('side-bar-plug-comp', SidebarPlugComp)
        vueObj.component('sidebar-link-plug-comp', SidebarLinkPlugComp)
    }
};

export default SidebarPlugin;

