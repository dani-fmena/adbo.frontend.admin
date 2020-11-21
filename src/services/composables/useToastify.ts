import { PluginOptions, POSITION, ToastInterface } from 'vue-toastification'
import { OPSKind } from '@/services/definitions'


export default function useToastify (t: ToastInterface) {
    
    /***
     * Inner private function to actually show the error.
     *
     * @param msg The error msg to show
     */
    function mkError (msg: string)
    {
        t.error(msg, { timeout: 5000, position: POSITION.TOP_RIGHT, icon: 'tim-icons icon-alert-circle-exc', })
    }
    
    
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
     *
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     * @param name Object/Entity name was involved int in the api request/operations
     */
    const tfyBasicSuccess = (subject: string, ops: OPSKind, name: undefined | string = undefined): void => {
        let kind
    
        if (ops === 'deletion') kind = 'deleted'
        else if (ops === 'addition') kind = 'created'
        else if (ops === 'enable') kind = 'enabled'
        else if (ops === 'disable') kind = 'disabled'
        else if (ops === 'updating') kind = 'updated'
        else kind = '[unknown]'
    
        t.success(`${ subject } ${ name !== undefined && typeof name === 'string' ? name : '' } was ${ kind } successfully.`, {
            timeout: 4000,
            position: POSITION.TOP_RIGHT,
            icon: 'tim-icons icon-check-2',
        } as PluginOptions)
    }
    
    /***
     * Cast a toast for a fail api operation / request
     *
     * @param error XHR HTTP Error object
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     * @param name Object/Entity name was involved int in the api request/operations
     */
    const tfyBasicFail = (error: any, subject: string, ops: OPSKind, name: undefined | string = undefined): void => {
        let kind
        let details
        let eName = name !== undefined && typeof name === 'string' ? name : ''
    
        if (ops === 'deletion') kind = 'deleting'
        else if (ops === 'addition') kind = 'creating'
        else if (ops === 'enable') kind = 'activating'
        else if (ops === 'disable') kind = 'disabling'
        else if (ops === 'updating') kind = 'updating'
        else kind = '[unknown]'
    
        const eCode = error.response.status
    
        if (eCode === 404) details = `The ${ subject } ${ eName } was not found.`
        else if (eCode === 500) details = `There was a internal error on the server.`
        else if (eCode === 422) details = `Validation error with ${error.response.data.detail![0].loc[1]}. ${error.response.data.detail![0].msg}.`
        else details = error.response.data.detail.description
        
        mkError(`Problem ${ kind } ${ subject } ${ eName }.${ details }`)
    }
    
    /***
     * Cast a toast for a fail api BULK operation / request
     *
     * @param error XHR HTTP Error object
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     */
    const tfyBulkFail = (error: any, subject: string, ops: OPSKind): void => {
        let kind
        let details
        
        if (ops === 'bulkenable') kind = 'activating'
        else if (ops === 'bulkdisable') kind = 'blablabla'
        else kind = '[unknown]'
    
        // Internal backend error with no return
        if (!error.response)
            mkError(`Bulk operation ${ kind } ${ subject } fail. Something really bad happen on server.`)
    
        const eCode = error.response.status
        
        if (eCode === 404) details = `Some ${ subject } was missing.`
        else if (eCode === 500) details = `The was a internal error on the server.`
        else details = error.response.data.detail
        
        mkError(`Problem with the bulk operation ${ kind } ${ subject }.${ details }`)
    }
    
    return {
        tfyPrimary,
        tfyBulkFail,
        tfyBasicFail,
        tfyBasicSuccess,
    }
}
