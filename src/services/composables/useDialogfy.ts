// import Swal from 'sweetalert2'
// @ts-ignore
import Swal from 'sweetalert2/dist/sweetalert2.min.js'

export default function useDialogfy () {
    
    /***
     * Basic dialog for a simple message
     *
     * @param msg The message
     */
        const dfyBasicOKBtn = (msg: string): void => {
        Swal.fire(msg)
    }
    
    return {
        dfyBasicOKBtn
    }
    
}
