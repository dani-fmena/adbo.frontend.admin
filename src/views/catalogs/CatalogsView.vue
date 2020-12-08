<template>
    <transition appear name="page-fade">
        <div class="row">

            <div class="col-12">
                <card-comp>
                    <!-- DATA TABLE -->
                    <table-comp
                            table-type="hover"
                            :actionBarMode="actionBarMode"
                            :columns="columns"
                            :data="catalogs.array"
                            :count="catalogsCount"
                            :has-actions="true"

                            v-on:navCreateIntent="h_NavCreateObj"

                            v-on:deleteIntent="h_DeleteObj"
                            v-on:detailsIntent="h_DetailsObject"
                            v-on:editIntent="h_EditObject"

                            v-on:enableIntent="h_EnableObject"
                            v-on:disableIntent="h_DisableObject"

                            v-on:bulkActionIntent="h_BulkActionIntent"

                            v-on:requestIntent="h_queryRequest"
                    />
                </card-comp>
            </div>

        </div>
    </transition>
</template>

<script lang="ts">
    import { computed, ComputedRef, defineComponent } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { PATH_NAMES } from '@/router/paths'
    import { CardComp, TableComp } from '@/components'
    import { useToast } from 'vue-toastification'
    import { AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
    import { GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import {
        BULK_ACTION,
        FormMode,
        HCatalogsTable,
        PAGE_SIZE,
        IBulkData,
        IShell,
        TableActionBarMode,
        IDTQueryBase
    } from '@/services/definitions'
    import useDialogfy from '@/services/composables/useDialogfy'
    import useToastify from '@/services/composables/useToastify'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'


    export default defineComponent({
        name: 'DashboardView',
        components: {
            CardComp,
            TableComp
        },
        setup () {
            //region ======== DECLARATIONS & LOCAL STATE ============================================
            const store = useStore()
            const router = useRouter()
            const toast = useToast()                                       // The toast lib interface
            const columns = HCatalogsTable
            const actionBarMode: TableActionBarMode = 'edr'

            const { dfyDeleteConfirmations } = useDialogfy()
            const { tfyBasicSuccess, tfyBasicFail, tfyBulkFail } = useToastify(toast)
            //endregion =============================================================================

            //region ======== FETCHING DATA ACTIONS =================================================
            store.dispatch(AINVOKER.GET_CATALOGS, { skip: 0, limit: PAGE_SIZE })
            .catch((error) => {tfyBasicFail(error, 'Catalogs', 'request')})
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
            const a_getQueryData = (queryData: IDTQueryBase) => {
                store.dispatch(AINVOKER.GET_CATALOGS, queryData)
                .catch((error) => {tfyBasicFail(error, 'Catalogs', 'request')})
            }
            const a_Delete = (catalogId: string): void => {
                store.dispatch(AINVOKER.DEL_CATALOGS, { id: catalogId })
                .then((deletedObj: ICatalog) => {
                    tfyBasicSuccess('Catalog', 'deletion', deletedObj.name)
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', 'deletion')})
            }
            const a_SetStatus = (catalogId: string, isToEnable: boolean): void => {
                store.dispatch(AINVOKER.SET_CATALOGS_STATUS, { id: catalogId, newStatus: isToEnable })
                .then(() => {
                    tfyBasicSuccess('Catalog', isToEnable ? 'enable' : 'disable', catalogs.value.dic[catalogId].name)
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', isToEnable ? 'enable' : 'disable')})
            }
            const a_bulkEnable = (ids: Array<string>) => {
                store.dispatch(AINVOKER.BULK_ENABLE_CATALOGS, { ids: ids })
                .then(() => {tfyBasicSuccess('Catalogs', 'enable')})
                .catch((error) => {tfyBulkFail(error, 'catalogs', 'enable')})
            }
            const a_bulkDisable = (ids: Array<string>) => {
                store.dispatch(AINVOKER.BULK_DISABLE_CATALOGS, { ids: ids })
                .then(() => {tfyBasicSuccess('Catalogs', 'disable')})
                .catch((error) => {tfyBulkFail(error, 'catalogs', 'disable')})
            }
            const a_bulkRemove = (ids: Array<string>) => {
                store.dispatch(AINVOKER.BULK_REMOVE_CATALOGS, { ids: ids })
                .then(() => {tfyBasicSuccess('Catalogs', 'deletion')})
                .catch((error) => {tfyBulkFail(error, 'catalogs', 'deletion')})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[GINVOKER.catalogs])
            const catalogsCount: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[GINVOKER.count])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const h_NavCreateObj = () => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: 'create' as FormMode, id: '', cname: 'Create Catalog' } })                     // cname means custom nam
            }
            const h_DeleteObj = (objectId: string) => {
                dfyDeleteConfirmations('Catalog', objectId, a_Delete, catalogs.value.dic[objectId].name)
            }
            const h_DetailsObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsDetails, params: { id: objectId } })
            }
            const h_EditObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: 'edit' as FormMode, id: objectId, cname: 'Edit Catalog'  } })
            }
            const h_EnableObject = (objectId: string) => {
                a_SetStatus(objectId, true)
            }
            const h_DisableObject = (objectId: string) => {
                a_SetStatus(objectId, false)
            }
            const h_BulkActionIntent = (bulkData: IBulkData) => {
                if (bulkData.actionType === 'ENABLE' as BULK_ACTION) a_bulkEnable(bulkData.ids)
                else if (bulkData.actionType === 'DISABLE' as BULK_ACTION) a_bulkDisable(bulkData.ids)
                else if (bulkData.actionType === 'REMOVE' as BULK_ACTION) a_bulkRemove(bulkData.ids)
            }
            const h_queryRequest = (queryData: IDTQueryBase) => {a_getQueryData(queryData)}
            //endregion =============================================================================

            //region ======== HELPERS ===============================================================
            //endregion =============================================================================

            return {
                catalogs,
                catalogsCount,
                columns,
                actionBarMode,

                h_NavCreateObj,
                h_DetailsObject,
                h_DeleteObj,
                h_EditObject,
                h_EnableObject,
                h_DisableObject,
                h_BulkActionIntent,
                h_queryRequest,
            }
        }
    })
</script>
