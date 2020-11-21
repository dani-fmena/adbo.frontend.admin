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
                            :has-actions="true"

                            v-on:navCreateIntent="h_NavCreateObj"

                            v-on:deleteIntent="h_DeleteObj"
                            v-on:detailsIntent="h_DetailsObject"
                            v-on:editIntent="h_EditObject"

                            v-on:enableIntent="h_EnableObject"
                            v-on:disableIntent="h_DisableObject"

                            v-on:bulkActionIntent="h_BulkActionIntent" />
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
    import { CATALOGS_GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import {
        BULK_ACTION,
        FORMMODE,
        HCatalogsTable,
        IBulkData,
        TableActionBarMode
    } from '@/services/definitions'
    import useDialogfy from '@/services/composables/useDialogfy'
    import useToastify from '../../services/composables/useToastify'
    import { IShell } from '@/services/definitions/common-types'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'


    export default defineComponent({
        name: 'DashboardView',
        components: {
            CardComp,
            TableComp
        },
        setup () {
            //region ======== DECLARATIONS ==========================================================
            const store = useStore()
            const router = useRouter()
            const toast = useToast()                                       // The toast lib interface
            const columns = HCatalogsTable
            const actionBarMode = TableActionBarMode.edr

            const { dfyDeleteConfirmations } = useDialogfy()
            const { tfyBasicSuccess, tfyBasicFail, tfyBulkFail } = useToastify(toast)
            //endregion =============================================================================

            //region ======== FETCHING DATA ACTIONS =================================================
            store.dispatch(AINVOKER.GET_CATALOGS)
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
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
                .catch((error) => {tfyBulkFail(error, 'catalogs', 'bulkenable')})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const h_NavCreateObj = () => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: FORMMODE.create, id: '', cname: 'Create Catalog' } })                     // cname means custom nam
            }
            const h_DeleteObj = (objectId: string) => {
                dfyDeleteConfirmations('Catalog', objectId, a_Delete, catalogs.value.dic[objectId].name)
            }
            const h_DetailsObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsDetails, params: { id: objectId } })
            }
            const h_EditObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: FORMMODE.edit, id: objectId, cname: 'Edit Catalog'  } })
            }
            const h_EnableObject = (objectId: string) => {
                a_SetStatus(objectId, true)
            }
            const h_DisableObject = (objectId: string) => {
                a_SetStatus(objectId, false)
            }
            const h_BulkActionIntent = (bulkData: IBulkData) => {
                if (bulkData.actionType === BULK_ACTION.ENABLE) a_bulkEnable(bulkData.ids)
            }
            //endregion =============================================================================

            //region ======== HELPERS ===============================================================
            //endregion =============================================================================

            return {
                catalogs,
                columns,
                actionBarMode,

                h_NavCreateObj,
                h_DetailsObject,
                h_DeleteObj,
                h_EditObject,
                h_EnableObject,
                h_DisableObject,
                h_BulkActionIntent
            }
        }
    })
</script>
