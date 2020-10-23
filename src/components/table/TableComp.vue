<template>
    <table class="table table-responsive-sm" :class="tableClass">

        <!-- TABLE HEADER -->
        <thead :class="theadClasses">
        <tr>
            <template v-for="header in columns" :key="header.title">
                <th colspan="1" rowspan="1" :class="[{'text-right': header.toRight}, {'text-left': header.toLeft}]">
                    <div>{{ header.title }}</div>
                </th>
            </template>
        </tr>
        </thead>

        <!-- TABLE BODY -->
        <tbody :class="tbodyClasses">
        <tr v-for="(rowObj, index) in data" :key="index" class="d-md-table-row">
            <template v-for="(header, index) in columns" :key="index">
                <td v-if="hasValue(rowObj, header)" rowspan="1" colspan="1">
                    {{rowValue(rowObj, header)}}
                </td>
            </template>
            <td v-if="hasActions">
                <div style="text-align: right">
                    <button type="button" class="btn like btn-link btn-icon btn-fab btn-info btn-sm">
                        <i class="tim-icons icon-heart-2"></i>
                    </button>
                    <button type="button" class="btn edit btn-link btn-icon btn-fab btn-warning btn-sm">
                        <i class="tim-icons icon-pencil"></i>
                    </button>
                    <button type="button" class="btn remove btn-link btn-icon btn-fab btn-danger btn-sm">
                        <i class="tim-icons icon-simple-remove"></i>
                    </button>
                </div>
            </td>
        </tr>

        <tr class="d-md-table-row">
            <td rowspan="1" colspan="1">Noelia O'Kon</td>
            <td rowspan="1" colspan="1">otho.smitham@example.com</td>
            <td rowspan="1" colspan="1">39</td>
            <td rowspan="1" colspan="1">€ 13098.00</td>
            <td rowspan="1" colspan="1">
                <div style="text-align: right">
                    <button type="button" class="btn like btn-link btn-icon btn-fab btn-info btn-sm">
                        <i class="tim-icons icon-heart-2"></i>
                    </button>
                    <button type="button" class="btn edit btn-link btn-icon btn-fab btn-warning btn-sm">
                        <i class="tim-icons icon-pencil"></i>
                    </button>
                    <button type="button" class="btn remove btn-link btn-icon btn-fab btn-danger btn-sm">
                        <i class="tim-icons icon-simple-remove"></i>
                    </button>
                </div>
            </td>
        </tr>
        </tbody>
    </table>

    <!-- PAGINATION -->
    <pagination-comp/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import PaginationComp from './PaginationComp.vue'
    import { IColumnHeader } from '@/services/definitions'


    export default defineComponent({
        name: 'TableComp',
        components: {
            PaginationComp
        },
        props: {
            columns: {
                type: Array,
                default: ():IColumnHeader[] => [],
                description: "Table columns"
            },
            data: {
                type: Array,
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
            hasValue (obj: any, column: IColumnHeader): boolean {
                const key = column.navKey !== undefined ? column.navKey : column.title.toLowerCase()
                return obj[key] !== undefined
            },
            rowValue (obj: any, column: IColumnHeader): string | number {
                const key = column.navKey !== undefined ? column.navKey : column.title.toLowerCase()
                return obj[key]
            }
        }
    })
</script>

<style scoped lang="scss">
</style>
