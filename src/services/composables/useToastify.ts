import { PluginOptions, POSITION, ToastInterface } from 'vue-toastification'
import { OPSKind } from '@/services/definitions'


export default function useToastify (t: ToastInterface) {
    
    function _mkError (msg: string)
    {
        t.error(msg, { timeout: 5000, position: POSITION.TOP_RIGHT, icon: 'tim-icons icon-alert-circle-exc', })
    }
    
    function _getOpsKind (ops: OPSKind, isPresent: boolean = false): string {
        let opsKind = '[unknown]'
    
        if (ops === 'deletion') opsKind = isPresent ? 'removing' : 'deleted'
        else if (ops === 'addition') opsKind = isPresent ? 'creating' : 'created'
        else if (ops === 'enable') opsKind = isPresent ? 'activating' : 'enabled'
        else if (ops === 'disable') opsKind = isPresent ? 'deactivating' : 'disabled'
        else if (ops === 'update') opsKind = isPresent ? 'updating' : 'updated'
        else if (ops === 'request') opsKind = isPresent ? 'requesting' : 'request'
        
        return opsKind
    }
    
    function _getDetails (error: any, subject: string = '', subjectName: string = '', isBulk: boolean = false): string {
        if (error === undefined) {console.error('Error object is undefined'); return '';}
        
        let details = error.response.data.detail.msg
        const eCode = error.response.status
        
        if (eCode === 400) details = `${ error.response.data.detail }`
        if (eCode === 401) details = `${ error.response.data.detail }`
        else if (eCode === 404) details = isBulk
            ? `Some ${ subject } identifier missing`
            : `The ${ subject } ${ subjectName } identifier is missing.`
        else if (eCode === 417 || eCode === 500) details = `${ error.response.data.detail.msg }`
        else if (eCode === 422) details = `Validation error with ${ error.response.data.detail![0].loc[1] }. ${ error.response.data.detail![0].msg }.`
        
        return details
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
        let kind = _getOpsKind(ops)
    
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
        let kind = _getOpsKind(ops, true)
        let subjectName = name !== undefined && typeof name === 'string' ? name : ''
    
        // Internal backend error with no return
        if (!error.response) {
            _mkError(`Ops ${ kind } ${ subject } fail. Something really bad happen on server.`)
            return
        }
        
        let details =_getDetails(error, subject, subjectName, )
        _mkError(`Ops ${ kind } ${ subject } ${ subjectName } fail. Error ${error.response.status}. ${ details }`)
    }
    
    /***
     * Cast a toast for a fail api BULK operation / request
     *
     * @param error XHR HTTP Error object
     * @param subject The subject entity of the operation
     * @param ops Type of API operation for the feedback
     */
    const tfyBulkFail = (error: any, subject: string, ops: OPSKind): void => {
        let kind = _getOpsKind(ops, true)
        
        // Internal backend error with no return
        if (!error.response) {
            _mkError(`Bulk ${ kind } ${ subject } fail. Something really bad happen on server.`)
            return
        }
        
        let details = _getDetails(error, subject, '',  true)
        _mkError(`Bulk ${ kind } ${ subject } fail. Error ${ error.response.status }. ${ details }`)
    }
    
    return {
        tfyPrimary,
        tfyBulkFail,
        tfyBasicFail,
        tfyBasicSuccess,
    }
}
