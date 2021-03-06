export interface IIndexable {
    _id: number | string
}

export interface IChecked {
    chked: boolean
}

/***
 * Generic type for a non param function
 */
export interface Function0<T = void> {
    (): T
}

/***
 * Generic type for a functions with one parameter
 */
export interface Function1<T1, T2 = void> {
    (param1: T1): T2
}

/***
 * Interface to describe object for datatable headers abstraction.
 * This create a flexible configuration for describing how to handle the headers and cell representation.
 */
export interface IColumnHeader {
    hidden: boolean | undefined
    chk: boolean | undefined                                        // define a checkbox cell / header
    title: string
    navKey: string | undefined                                      // so v-for can navigate in the data array. if isn't present, lower-cased title be use then. It comes in handy when we have a user friendly title different from the real key
    toLeft: boolean | undefined
    toRight: boolean | undefined
    toCenter: boolean | undefined
    width: number | undefined                                       // percent (%)
    switch: boolean | undefined                                     // if we can use this cell as a switch for enable / disable actions
    sorting: SortDir | undefined                                    // sorting information of the header
}

/***
 * Describe a dictionary mapped by the object ids or keys
 */
export type ById<T> = {
    [_id: string]: T
}

/***
 * A Shell or abstractions has a collection of object by array and with a dictionary mapped by the id object
 */
export type IShell<T> = {
    array: T[],
    dic: ById<T>
}

/***
 * Definition for API operations that requieres a UI toast feedback
 */
export type OPSKind = 'deletion' | 'addition' | 'update' | 'enable' | 'disable' | 'request'

/***
 * Definition for entities forms view mode
 */
export type FormMode = 'edit' | 'create'

/***
 *  Table Top Buttons Action Bar Mode
 */
export type TableActionBarMode = 'default' | 'edr'

/***
 * Table Top Buttons Action Bar (BULK ACTION) clicked action
 */
export type BULK_ACTION = | 'ENABLE' | 'DISABLE' | 'REMOVE'

/***
 * Interface for type the emission argument object for the table's checkbox component
 */
export interface ITableChkEmit {
    id: string
    newStatus: boolean
}

/***
 * Interface for type the emission argument object for the table's bulk actions events
 */
export interface IBulkData {
    ids: string[]
    actionType: BULK_ACTION
}

/**
 * Datatable sort header direction
 */
export type SortDir = 'asc' | 'desc' | ''

/**
 * This type hold the base query information related to a datatable
 */
export interface IDTQueryBase {
    sortdir: SortDir
    field: string
    skip: number
    limit: number
    search: string
}

