import { SweetAlertOptions, SweetAlertResult } from 'sweetalert2'
//@ts-ignore               this is 'cause we are customizing the sweetalert2 scss, we don't need de original styles files
import Swal from 'sweetalert2/dist/sweetalert2.min.js'
import { Function1 } from '@/services/definitions'


export default function useDialogfy () {
    
    /***
     * Basic dialog for a simple message.
     * @param txt The text for the dialog
     */
    const dfyBasicOKBtn = (txt: string): void => {
        Swal.fire({
            titleText: txt,
            showDenyButton: true,
            showCancelButton: true
            
        } as SweetAlertOptions)
    }
    
    /***
     * Dialog for confirm a deletion, showing the confirm and decline buttons.
     * @param subject Subject or type of entity of the deletion operation.
     * @param target Target to be deleted.
     * @param callback Function callback to be call if the dialog was confirm
     * @param name Object/Entity name to be deleted
     */
    const dfyDeleteConfirmations = (subject: string, target: string, callback: Function1<string>, name: undefined | string = undefined): void => {
        let text = 'Are you sure you want to delete this catalog ?'
        
        if (name !== undefined && typeof name === "string")
            text = `Are you sure you want to the delete the ${ name } catalog ?`
    
        Swal.fire({
            icon: 'warning',
            titleText: `${ subject } Deletion`,
            text: text,
            showDenyButton: true
        } as SweetAlertOptions).then((result: SweetAlertResult) => {
            if (result.isConfirmed) callback(target)
        })
    }
    
    return {
        dfyBasicOKBtn,
        dfyDeleteConfirmations
    }
}
