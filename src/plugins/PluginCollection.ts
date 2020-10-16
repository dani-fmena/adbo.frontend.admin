import SidebarPlugin from './Sidebar'


export default {
    install (app: any) {
        app.use(SidebarPlugin)
    }
}
