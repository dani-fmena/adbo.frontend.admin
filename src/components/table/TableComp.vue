<template>
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
                <actions-comp/>
            </td>
        </tr>
        </tbody>
    </table>

    <!-- PAGINATION -->
    <pagination-comp/>
</template>

<script lang="ts">
    import { defineComponent, PropType } from 'vue'
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
        computed: {
            tableClass (): string {
                return this.tableType && `table-${this.tableType}`
            }
        },
        methods: {
            _getNavKey (header : IColumnHeader) :string {
                return header.navKey !== undefined ? header.navKey : header.title.toLowerCase()
            },
            hasValue (obj: any, column: IColumnHeader): boolean {
                const key = this._getNavKey(column)
                return obj[key] !== undefined
            },
            rowValue (obj: any, column: IColumnHeader): string | number {
                const key = this._getNavKey(column)
                return obj[key]
            }
        }
    })
</script>

<style scoped lang="scss">
</style>
