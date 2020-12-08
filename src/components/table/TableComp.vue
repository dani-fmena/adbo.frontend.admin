<template>
    <!-- BUTTONS BAR -->
    <template v-if="hasTopBtnBar">
        <!-- TODO If you need another direction of action bar function create a dynamic component here -->
        <table-action-bar-comp :mode="mode"
                               :chkCount="Object.keys(ls_selections.selected).length"
                               v-on:navCreateIntent="$emit('navCreateIntent')"

                               v-on:enableChkCollIntent="h_EnableChkCollection"
                               v-on:disableChkCollIntent="h_DisableChkCollection"
                               v-on:removeChkCollIntent="h_RemoveChkCollection" />
    </template>

    <!-- SEARCH & PAGE SIZE BAR -->
    <template v-if="(hasPageSizeSelector || hasSearch) && data.length > 0">
        <div class="table-action-bars col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">

            <!-- TABLE PAGE SIZE -->
            <div class="select-primary mb-3 pagination-select" v-if="hasPageSizeSelector">
                <select id="table-page-size" name="page_size" class="form-control" @change="h_pageSizeChange($event)">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>

            <!-- SEARCH INPUT -->
            <div class="form-group has-icon" v-if="hasSearch">
                <div class="mb-0 input-group">
                <span class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="tim-icons icon-zoom-split"></i>
                    </div>
                </span>
                    <input class="form-control"
                           type="text"
                           placeholder="Search"
                           aria-describedby="addon-right addon-left"
                           @input="debounceListener"
                           @blur="h_onSrchBlursEvt($event)"
                           @focus="h_onSrchFocusEvt($event)">
                </div>
            </div>
        </div>
    </template>

    <!-- TABLE -->
    <table v-if="data.length > 0" class="table table-responsive-sm" :class="tableClass">

        <!-- TABLE HEADER -->
        <thead :class="theadClasses">
        <tr>
            <template v-for="header in ls_columns" :key="header.title">

                <!-- check all cell -->
                <th v-if="header.chk" colspan="1" rowspan="1">
                    <div class="form-check">
                        <label class="form-check-label">
                            <input class="form-check-input"
                                   type="checkbox"
                                   v-bind="$attrs"
                                   :checked="ls_rootChkBoxState"
                                   @change="h_ChkAllObjects($event)">
                            <span class="form-check-sign"></span>
                        </label>
                    </div>
                </th>

                <!-- normal header cell -->
                <th v-else
                    colspan="1"
                    rowspan="1"
                    v-if="!header.hidden"
                    :class="[{'text-right': header.toRight}, {'text-left': header.toLeft}, {'text-center': header.toCenter}]">
                    {{ header.title }}

                    <span @click.prevent="h_changeSort(header)" v-if="header.sorting || header.sorting === ''" class="caret-wrapper">
                        <i class="fa fa-caret-up sorter" :class="{'active': header.sorting === 'asc'}"></i>
                        <i class="fa fa-caret-down sorter" :class="{'active': header.sorting === 'desc'}"></i>
                    </span>
                </th>

            </template>
        </tr>
        </thead>

        <!-- TABLE BODY -->
        <tbody :class="tbodyClasses">
        <tr v-for="(rowObj, index) in data" :key="index" class="d-md-table-row">
            <template v-for="(header, index) in ls_columns" :key="index">
                <!-- checkbox cell -->
                <td v-if="header.chk === true" rowspan="1" colspan="1" :style="[{'width': header.width + '%'}]">
                    <chkbox-table-comp :identifier="rowObj['_id']"
                                       :checked="ls_selections.selected[rowObj['_id']]"
                                       v-on:checkIntent="h_ChkObject" />
                </td>

                <!-- switch / toggle mode -->
                <td v-else-if="chkHasValue(rowObj, header) && !header.hidden && header.switch"
                    rowspan="1"
                    colspan="1"
                    :style="[{'width': header.width + '%'}]">
                    <switch-cell-comp :identifier="rowObj['_id']"
                                      :is-enable="getRowValue(rowObj, header)"
                                      v-on:enableIntent="$emit('enableIntent', $event)"
                                      v-on:disableIntent="$emit('disableIntent', $event)" />
                </td>

                <!-- normal mode -->
                <td v-else-if="chkHasValue(rowObj, header) && !header.hidden"
                    rowspan="1"
                    colspan="1"
                    :class="[{'text-right': header.toRight}, {'text-left': header.toLeft}, {'text-center': header.toCenter}]"
                    :style="[{'width': header.width + '%'}]">
                    {{ getRowValue(rowObj, header) }}
                </td>
            </template>

            <!-- ACTIONS TD -->
            <td class="actions" v-if="hasActions && chkHasId(rowObj)">
                <row-actions-comp :identifier="rowObj['_id']"
                                  v-on:deleteIntent="$emit('deleteIntent', $event)"
                                  v-on:detailsIntent="$emit('detailsIntent', $event)"
                                  v-on:editIntent="$emit('editIntent', $event)" />
            </td>
        </tr>
        </tbody>
    </table>
    <empty-table-comp v-else/>

    <!-- PAGINATION -->
    <pagination-comp v-if="data.length > 0" :size="ls_pageSize" :total="count" v-on:next="h_computePaginationData" />
</template>


<script lang="ts">
    import { computed, defineComponent, PropType, toRaw, reactive, ref, SetupContext } from 'vue'
    import PaginationComp from './PaginationComp.vue'
    import SwitchCellComp from './SwitchCellComp.vue'
    import EmptyTableComp from './EmptyTableComp.vue'
    import ChkboxTableComp from './ChkboxTableComp.vue'
    import RowActionsComp from './RowActionsComp.vue'
    import TableActionBarComp from './TableActionBarComp.vue'
    import {
        BULK_ACTION,
        ById,
        IColumnHeader,
        IIndexable,
        ITableChkEmit,
        IChecked,
        PAGE_SIZE,
        IDTQueryBase
    } from '@/services/definitions'
    import { BaseButtonComp } from '@/components'
    import useDebaunce from '@/services/composables/useDebaunce'


    export default defineComponent({
        name: 'TableComp',
        components: {
            PaginationComp,
            BaseButtonComp,
            SwitchCellComp,
            EmptyTableComp,
            ChkboxTableComp,
            TableActionBarComp,
            RowActionsComp,
        },
        props: {
            columns: {
                type: Array,
                default: ():IColumnHeader[] => [],
                description: 'Table columns'
            },
            actionBarMode: {
                type: String,
                default: false,
                description: 'If the table has actions buttons or not',

                // all the modes values responds to the 'actionBarMode' TableComp.vue prop
                validator (value: string): boolean {
                    const acceptedValues = ['default', 'edr']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            count: {
                type: Number,
                default: 0,
                description: 'The number of all the records/document of this type of entity in the database'
            },
            data: {
                type: Object as PropType<IIndexable[]>,
                default: [],
                description: 'The collection of the data for display in the table'
            },
            hasActions: {
                type: Boolean,
                default: false,
                description: 'If the table has actions buttons or not'
            },
            hasTopBtnBar: {
                type: Boolean,
                default: true,
                description: 'If the table has the top button bar for specific actions like creation button'
            },
            hasPageSizeSelector: {
                type: Boolean,
                default: true,
                description: 'If the table has the page size (limit) selector items'
            },
            hasSearch: {
                type: Boolean,
                default: true,
                description: 'If the table has search field or not'
            },
            tbodyClasses: {
                type: String,
                default: '',
                description: 'tbody tag css classes'
            },
            theadClasses: {
                type: String,
                default: '',
                description: 'thead tag css classes'
            },
            tableType: {
                type: String, // striped | hover
                default: '',
                description: 'Whether table is striped or hover type',

                validator (value: string): boolean {
                    const acceptedValues = ['', 'striped', 'hover']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
        },
        emits: [
            'detailsIntent',
            'deleteIntent',
            'editIntent',
            'navCreateIntent',

            'enableIntent',
            'disableIntent',

            'bulkActionIntent',

            'requestIntent',
        ],

        setup (props: any, ctx: SetupContext) {
            //region ======== DECLARATIONS & LOCAL STATE ============================================
            const ls_selections = reactive<{ selected: ById<IChecked> }>({ selected: { } })
            const ls_rootChkBoxState = ref<boolean>(false)
            const ls_pageSize = ref<number>(PAGE_SIZE)
            const ls_columns = ref<Array<Partial<IColumnHeader>>>([ ...props.columns ])
            let ls_dtQueryData: IDTQueryBase = {
                sortdir: '',
                field: '',
                skip: 0,
                limit: PAGE_SIZE,
                search: ''
            }
            const mode = toRaw(props.actionBarMode)                                                                  // Returns the raw, original object of a reactive or readonly proxy. This is an escape hatch that can be used to temporarily read without incurring proxy access/tracking overhead or write without triggering changes.

            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const tableClass = computed((): string => props.tableType && `table-${props.tableType}`)
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const h_onSrchFocusEvt = (evt: any) => {
                inputToggleFocusClass(evt.target.parentElement.parentNode)
            }
            const h_onSrchBlursEvt = (evt: any) => {
                inputToggleFocusClass(evt.target.parentElement.parentNode)
            }
            const h_ChkAllObjects = (evt: any) => {
                ls_selections.selected = updateChckAllToSelection(evt.target.checked, props.data)
            }
            const h_ChkObject = (args: ITableChkEmit) => {
                updateChkSelection(ls_selections.selected, args)
            }
            const h_EnableChkCollection = () => {
                ctx.emit('bulkActionIntent', { ids: [...Object.keys(ls_selections.selected)], actionType: 'ENABLE' as BULK_ACTION })
                cleanCheckBoxes()
            }
            const h_DisableChkCollection = () => {
                ctx.emit('bulkActionIntent', { ids: [...Object.keys(ls_selections.selected)], actionType: 'DISABLE' as BULK_ACTION })
                cleanCheckBoxes()
            }
            const h_RemoveChkCollection = () => {
                ctx.emit('bulkActionIntent', { ids: [...Object.keys(ls_selections.selected)], actionType: 'REMOVE' as BULK_ACTION })
                cleanCheckBoxes()
            }
            const h_pageSizeChange = (evt: any) => {
                ls_pageSize.value = +evt.target.value
            }
            const h_computePaginationData = (nextPage: number) => {
                ls_dtQueryData.skip = nextPage == 1 ? 0 : nextPage * ls_pageSize.value - ls_pageSize.value
                ls_dtQueryData.limit = ls_pageSize.value

                ctx.emit('requestIntent', ls_dtQueryData)
            }
            /***
             * Update sorting information of the headers/columns array (IColumnHeader [])
             * @param clickedSortHeader Clicked header/column object
             */
            const h_changeSort = (clickedSortHeader: Partial<IColumnHeader>) => {
                ls_columns.value = ls_columns.value.map<Partial<IColumnHeader>>(header => {
                    if (header.title === clickedSortHeader.title && header.sorting !== undefined)
                    {
                        switch (header.sorting) {
                            case 'asc':
                                header.sorting = 'desc'
                                break
                            case 'desc':
                                header.sorting = ''
                                break
                            case '':
                                header.sorting = 'asc'
                                break
                        }
                        ls_dtQueryData.field = getNavKey(header)
                        ls_dtQueryData.sortdir = header.sorting

                        ctx.emit('requestIntent', ls_dtQueryData)
                    }
                    else if (header.sorting !== undefined) header.sorting = ''

                    return header
                })
            }
            const h_searchChange = (search: string) => {
                ls_dtQueryData.search = search
                ctx.emit('requestIntent', ls_dtQueryData)
            }

            //endregion =============================================================================

            //region ======== HELPERS ===============================================================
            /***
             * Try to empty the selection reactive var to make unchecked all the checked rows in the table
             */
            const cleanCheckBoxes = () => {
                ls_rootChkBoxState.value = false
                ls_selections.selected = updateChckAllToSelection(false)
            }

            /***
             * If status is true, return a new selection for selecting all the object from table (the same as data). Otherwise
             * return an empty selection collection.
             *
             * @param status The new status from the root checkbox input event
             * @param data The props containing all the data represented on the table
            */
            const updateChckAllToSelection = (status: boolean, data: Array<IIndexable> | undefined = undefined): ById<IChecked> => {
                ls_rootChkBoxState.value = status

                if (status)
                    return data!.reduce<ById<IChecked>>((accumulator, obj) => {
                        accumulator[obj._id] = { chked: true }

                        return accumulator
                    }, {})
                else return {}
            }

            /***
             * Modify the source (selected objects in the table) to update (depends of newStatus in updateData) the selected object ID
             *
             * @param source The source collection of already selected (or none) ID object
             * @param updateData ITableChkEmit data. Coming from the checked row cell, containing the object id and its new checked status.
             */
            const updateChkSelection = (source: ById<IChecked>, updateData: ITableChkEmit): void => {
                if (updateData.newStatus) source[updateData.id] = { chked: updateData.newStatus }
                else delete source[updateData.id]
            }

            /***
             * After the addition to this class to the element the styles applies the correct border
             * color to the form group (class) element (div)
             *
             * @param formGroupEl Div with the form-group class thet the input (event target) belongs to
             */
            const inputToggleFocusClass = (formGroupEl: Element) => {
                formGroupEl.classList.toggle('input-group-focus')
            }

            /***
             * Get navigation key for obtain the row object property value. Like 2D matrix['navigation_key']
             * @param column object describing the header properties
             */
            const getNavKey = (column: Partial<IColumnHeader>): string => {
                return column.navKey !== undefined ? column.navKey : column.title!.toLowerCase()
            }

            /***
             * Check if the row object has a value corresponding to a specific header
             * @param obj row object
             * @param column object describing the header properties
             */
            const chkHasValue = (obj: any, column: IColumnHeader): boolean => {
                const key = getNavKey(column)

                return obj[key] !== undefined
            }

            /***
             * Check if the row object has an id property
             * @param obj row object
             */
            const chkHasId = (obj: any): boolean => {return obj['_id'] !== undefined}

            /***
             * Get the actual row object property value base on the navigation key from the column object
             * @param obj row object
             * @param column object describing the header properties
             */
            const getRowValue = (obj: any, column: IColumnHeader): string | number => {
                const key = getNavKey(column)
                return obj[key]
            }
            //endregion =============================================================================

            return {
                mode,
                ls_pageSize,
                ls_selections,
                ls_rootChkBoxState,
                ls_columns,

                getNavKey,
                chkHasValue,
                getRowValue,
                chkHasId,

                h_onSrchFocusEvt,
                h_onSrchBlursEvt,

                h_ChkObject,
                h_ChkAllObjects,
                h_pageSizeChange,
                h_EnableChkCollection,
                h_DisableChkCollection,
                h_RemoveChkCollection,
                h_computePaginationData,
                h_changeSort,
                h_searchChange,
                ...useDebaunce(h_searchChange),

                tableClass
            }
        }
    })
</script>

<style lang="scss" scoped>
    .table-action-bars {
        padding: 0 !important;
    }
</style>
