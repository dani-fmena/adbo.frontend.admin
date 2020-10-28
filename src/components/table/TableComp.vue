<template>

    <!-- ACTION BAR -->
    <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap">

        <!-- TABLE OFFSET -->
        <div class="select-primary mb-3 pagination-select">
            <select id="table-offset" name="offset" class="form-control">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="0">All</option>
            </select>
        </div>

        <!-- SEARCH INPUT -->
        <div class="form-group has-icon">
            <div class="mb-0 input-group">
                <span class="input-group-prepend">
                    <div class="input-group-text">
                        <i class="tim-icons icon-zoom-split"></i>
                    </div>
                </span>
                <input aria-describedby="addon-right addon-left" placeholder="Search" class="form-control">
            </div>
        </div>
    </div>


    <!-- TABLE -->
    <table class="table table-responsive-sm" :class="tableClass">

        <!-- TABLE HEADER -->
        <thead :class="theadClasses">
        <tr>
            <template v-for="header in columns" :key="header.title">
                <th colspan="1" rowspan="1" :class="[{'text-right': header.toRight}, {'text-left': header.toLeft}, {'text-center': header.toCenter}]">
                    <div>{{ header.title }}</div>
                </th>
            </template>
        </tr>
        </thead>

        <!-- TABLE BODY -->
        <tbody :class="tbodyClasses">
        <tr v-for="(rowObj, index) in data" :key="index" class="d-md-table-row">
            <template v-for="(header, index) in columns" :key="index">
                <td v-if="hasValue(rowObj, header)"
                    rowspan="1"
                    colspan="1"
                    :class="[{'text-right': header.toRight}, {'text-left': header.toLeft}, {'text-center': header.toCenter}]"
                    :style="[{'width': header.width + '%'}]">
                    {{rowValue(rowObj, header)}}
                </td>
            </template>

            <!-- ACTIONS TD -->
            <td class="actions" v-if="hasActions">
                <actions-comp
                        v-on:deleteIntent="deleteHandler"
                        v-on:detailsIntent="detailsHandler"
                        v-on:editIntent="editHandler"
                />
            </td>
        </tr>
        </tbody>
    </table>

    <!-- PAGINATION -->
    <pagination-comp/>
</template>

<script lang="ts">
    import { computed, defineComponent, PropType } from 'vue'
    import PaginationComp from './PaginationComp.vue'
    import ActionsComp from './ActionsComp.vue'
    import { IColumnHeader } from '@/services/definitions'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'


    export default defineComponent({
        name: 'TableComp',
        components: {
            PaginationComp,
            ActionsComp
        },
        props: {
            columns: {
                type: Array,
                default: ():IColumnHeader[] => [],
                description: "Table columns"
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
        setup (props: any) {
            //region ======== COMPUTATIONS ==========================================================
            const tableClass = computed((): string => props.tableType && `table-${props.tableType}`)
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const deleteHandler = ( event: any ) => {
                console.log('delete', event.target)
            }
            const detailsHandler = ( event: any ) => {
                console.log('details', event.target)
            }
            const editHandler = ( event: any ) => {
                console.log('edit', event.target)
            }
            //endregion =============================================================================

            //region ======== AUX ===================================================================
            const getNavKey = (header: IColumnHeader): string => {
                return header.navKey !== undefined ? header.navKey : header.title.toLowerCase()
            }

            const hasValue = (obj: any, column: IColumnHeader): boolean => {
                const key = getNavKey(column)
                return obj[key] !== undefined
            }

            const rowValue = (obj: any, column: IColumnHeader): string | number => {
                const key = getNavKey(column)
                return obj[key]
            }
            //endregion =============================================================================

            return {
                getNavKey,
                hasValue,
                rowValue,

                tableClass,

                deleteHandler,
                detailsHandler,
                editHandler,
            }
        }
    })
</script>

<style scoped lang="scss">
</style>
