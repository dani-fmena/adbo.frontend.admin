<template>
    <!-- BUTTONS BAR -->
    <template v-if="hasTopBtnBar">
        <table-action-bar-comp :mode="mode"
                               :chkCount="selections.checked.length"
                               v-on:createNavIntent="$emit('createNavIntent')"

                               v-on:enableChkCollIntent="handleEnableChkCollection"
                               v-on:disableChkCollIntent="handleDisableChkCollection"
                               v-on:removeChkCollIntent="handleRemoveChkCollection" />
    </template>

    <!-- SEARCH & OFFSET BAR -->
    <template v-if="(hasOffsetSelector || hasSearch) && data.length > 0">
        <div class="table-action-bars col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">

            <!-- OFFSET -->
            <div class="select-primary mb-3 pagination-select" v-if="hasOffsetSelector">
                <select id="table-offset" name="offset" class="form-control">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="0">All</option>
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
                           @blur="onSrchBlursEvt($event)"
                           @focus="onSrchFocusEvt($event)">
                </div>
            </div>
        </div>
    </template>

    <!-- TABLE -->
    <table v-if="data.length > 0" class="table table-responsive-sm" :class="tableClass">

        <!-- TABLE HEADER -->
        <thead :class="theadClasses">
        <tr>
            <template v-for="header in columns" :key="header.title">
                <th colspan="1"
                    rowspan="1"
                    v-if="!header.hidden"
                    :class="[{'text-right': header.toRight}, {'text-left': header.toLeft}, {'text-center': header.toCenter}]">
                    {{ header.title }}
                </th>
            </template>
        </tr>
        </thead>

        <!-- TABLE BODY -->
        <tbody :class="tbodyClasses">
        <tr v-for="(rowObj, index) in data" :key="index" class="d-md-table-row">
            <template v-for="(header, index) in columns" :key="index">

                <!-- checkbox cell -->
                <td v-if="header.chk === true" rowspan="1" colspan="1" :style="[{'width': header.width + '%'}]">
                    <chkbox-table-comp :identifier="rowObj['_id']" v-on:checkIntent="handleChkObject"/>
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
    <pagination-comp v-if="data.length > 0"/>
</template>


<script lang="ts">
    import { computed, defineComponent, PropType, toRaw, reactive } from 'vue'
    import PaginationComp from './PaginationComp.vue'
    import SwitchCellComp from './SwitchCellComp.vue'
    import EmptyTableComp from './EmptyTableComp.vue'
    import ChkboxTableComp from './ChkboxTableComp.vue'
    import RowActionsComp from './RowActionsComp.vue'
    import TableActionBarComp from './TableActionBarComp.vue'
    import { BULK_ACTION, IColumnHeader, ITableChkEmit } from '@/services/definitions'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'
    import { BaseButtonComp } from '@/components'
    import { updateChksCollection } from '@/services/helpers/help-conversion'


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
                description: "Table columns"
            },
            actionBarMode: {
                type: String,
                default: false,
                description: "If the table has actions buttons or not",

                // all the modes values responds to the 'actionBarMode' TableComp.vue prop
                validator (value: string): boolean {
                    const acceptedValues = ['default', 'edr']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            data: {
                type: Object as PropType<ICatalog[]>,
                default: () => [],
                description: "Table data"
            },
            hasActions: {
                type: Boolean,
                default: false,
                description: "If the table has actions buttons or not"
            },
            hasTopBtnBar: {
                type: Boolean,
                default: true,
                description: "If the table has the top button bar for specific actions like creation button"
            },
            hasOffsetSelector: {
                type: Boolean,
                default: true,
                description: "If the table has the offset selector items for the table (5, 10 , 25, eth)"
            },
            hasSearch: {
                type: Boolean,
                default: true,
                description: "If the table has search field or not"
            },
            tbodyClasses: {
                type: String,
                default: '',
                description: "tbody tag css classes"
            },
            theadClasses: {
                type: String,
                default: '',
                description: "thead tag css classes"
            },
            tableType: {
                type: String, // striped | hover
                default: "",
                description: "Whether table is striped or hover type",

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
            'createNavIntent',

            'enableIntent',
            'disableIntent',

            'bulkActionIntent',
        ],
        setup (props: any, cntx) {
            //region ======== DECLARATIONS ==========================================================
            const selections = reactive<{ checked: Array<string> }>({ checked: [] })
            const mode = toRaw(props.actionBarMode)                                                                 // Returns the raw, original object of a reactive or readonly proxy. This is an escape hatch that can be used to temporarily read without incurring proxy access/tracking overhead or write without triggering changes.
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const tableClass = computed((): string => props.tableType && `table-${props.tableType}`)
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const onSrchFocusEvt = (evt: any) => {
                inputToggleFocusClass(evt.target.parentElement.parentNode)
            }
            const onSrchBlursEvt = (evt: any) => {
                inputToggleFocusClass(evt.target.parentElement.parentNode)
            }
            const handleChkObject = (args: ITableChkEmit) => {
                selections.checked = updateChksCollection(selections.checked, args)
            }
            const handleEnableChkCollection = () => {
                cntx.emit('bulkActionIntent', { ids: selections.checked, actionType: BULK_ACTION.ENABLE })
            }
            const handleDisableChkCollection = () => {
                cntx.emit('bulkActionIntent', { ids: selections.checked, actionType: BULK_ACTION.DISABLE })
            }
            const handleRemoveChkCollection = () => {
                cntx.emit('bulkActionIntent', { ids: selections.checked, actionType: BULK_ACTION.REMOVE })
            }
            //endregion =============================================================================

            //region ======== HELPERS ===============================================================
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
            const getNavKey = (column: IColumnHeader): string => {
                return column.navKey !== undefined ? column.navKey : column.title.toLowerCase()
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
                selections,

                getNavKey,
                chkHasValue,
                getRowValue,
                chkHasId,

                onSrchFocusEvt,
                onSrchBlursEvt,

                handleChkObject,
                handleEnableChkCollection,
                handleDisableChkCollection,
                handleRemoveChkCollection,

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
