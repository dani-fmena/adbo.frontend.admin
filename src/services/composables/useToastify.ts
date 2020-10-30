import { POSITION, PluginOptions, ToastInterface } from 'vue-toastification'


export default function useToastify (t: ToastInterface) {
    
    const tfyPrimary = (msg: string): void => {
        t(msg, {
            timeout: 3000,
            position: POSITION.TOP_RIGHT,
            icon: 'tim-icons icon-bell-55',
        } as PluginOptions)
    }
    
    return {
        tfyPrimary
    }
}
