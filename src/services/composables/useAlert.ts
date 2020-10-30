import { POSITION, PluginOptions, ToastInterface } from 'vue-toastification'


export default function useAlert (t: ToastInterface) {
    
    const ShowAlertPrimary = (msg: string): void => {
        t(msg, {
            timeout: 3000,
            position: POSITION.TOP_RIGHT,
            icon: 'tim-icons icon-bell-55',
        } as PluginOptions)
    }
    
    return {
        ShowAlertPrimary
    }
}
