import SidebarPlugin from './sidebar'


export default {
    install (app: any) {
        app.use(SidebarPlugin)
    }
}
