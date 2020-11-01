import { PluginOptions, POSITION, ToastInterface } from 'vue-toastification'
import { OPSKind } from '@/services/definitions'


export default function useToastify (t: ToastInterface) {
    
    /***
     * Very basic of toas example with a fixed position in the TopRight screen area,
     * and an exposure time of 3 seconds.
     * @param msg the message to show
     */
    const tfyPrimary = (msg: string): void => {                 // tfy is stand for toastify
        t(msg, {
            timeout: 3000,
            position: POSITION.TOP_RIGHT,
            icon: 'tim-icons icon-bell-55',
        } as PluginOptions)
    }
    
    /***
     * Cast a toast for a successfully operation / request
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     * @param name Object/Entity name was involved int in the api request/operations
     */
    const tfyBasicSuccess = (subject: string, ops: OPSKind, name: undefined | string = undefined): void => {
        let kind
    
        if (ops === OPSKind.deletion) kind = "deleted"
        else if (ops === OPSKind.addition) kind = "created"
        else if (ops === OPSKind.updating) kind = "updated"
        else kind = '[unknown]'
    
        t.success(`${ subject } ${ name !== undefined && typeof name === 'string' ? name : '' } was ${ kind } successfully.`, {
            timeout: 4000,
            position: POSITION.TOP_RIGHT,
            icon: 'tim-icons icon-check-2',
        } as PluginOptions)
    }
    
    /***
     * Cast a toast for a fail api operation / request
     * @param error XHR HTTP Error object
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     * @param name Object/Entity name was involved int in the api request/operations
     */
    const tfyBasicFail = (error: any, subject: string, ops: OPSKind, name: undefined | string = undefined): void => {
        let kind
        let details
        let eName = name !== undefined && typeof name === 'string' ? name : ''
    
        if (ops === OPSKind.deletion) kind = "deleting"
        else if (ops === OPSKind.addition) kind = "creating"
        else if (ops === OPSKind.updating) kind = "updating"
        else kind = '[unknown]'
    
        // console.log({ ...error })
        const eCode = error.response.status
    
        if (eCode === 404) details = `The ${ subject } ${ eName } was not found.`
        else if (eCode === 500) details = `The was a internal error on the server.`
        else details = error.response.data.detail.description
        
        t.error(`Problem ${ kind } the ${ subject } ${ eName }.${ details }`, {
            timeout: 5000,
            position: POSITION.TOP_RIGHT,
            icon: 'tim-icons icon-alert-circle-exc',
        })
    }
    
    return {
        tfyPrimary,
        tfyBasicFail,
        tfyBasicSuccess
    }
}
