<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <card-comp>

                    <!-- DATA TABLE -->
                    <table-comp
                            table-type="hover"

                            v-on:deleteIntent="handlerDeleteObj"
                            v-on:detailsIntent="handleDetailsObject"
                            v-on:editIntent="handleEditObject"

                            v-on:createIntent="handleCreateObj"

                            v-on:enableIntent="handleEnableObject"
                            v-on:disableIntent="handleDisableObject"

                            :columns="columns"
                            :data="catalogs.array"
                            :has-actions="true" />



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
    import { FORMMODE, HCatalogsTable, OPSKind } from '@/services/definitions'
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

            const { dfyDeleteConfirmations } = useDialogfy()
            const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
            //endregion =============================================================================

            //region ======== FETCHING DATA ACTIONS =================================================
            store.dispatch(AINVOKER.GET_CATALOGS)
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
            const a_Delete = (catalogId: string): void => {
                store.dispatch(AINVOKER.DEL_CATALOGS, { id: catalogId })
                .then((deletedObj: ICatalog) => {
                    tfyBasicSuccess('Catalog', OPSKind.deletion, deletedObj.name)
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', OPSKind.deletion)})
            }

            const a_SetStatus = (catalogId: string, isToEnable: boolean): void => {
                store.dispatch(AINVOKER.SET_CATALOGS_STATUS, { id: catalogId, newStatus: isToEnable })
                .then(() => {
                    tfyBasicSuccess('Catalog', isToEnable ? OPSKind.enable : OPSKind.disable, catalogs.value.dic[catalogId].name)
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', isToEnable ? OPSKind.enable : OPSKind.disable)})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const handleCreateObj = () => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: FORMMODE.create, id: '', cname: 'Create Catalog' } })                     // cname means custom nam
            }
            const handlerDeleteObj = (objectId: string) => {
                dfyDeleteConfirmations('Catalog', objectId, a_Delete, catalogs.value.dic[objectId].name)
            }
            const handleDetailsObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsDetails, params: { id: objectId } })
            }
            const handleEditObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: FORMMODE.edit, id: objectId, cname: 'Edit Catalog'  } })
            }
            const handleEnableObject = (objectId: string) => {
                a_SetStatus(objectId, true)
            }
            const handleDisableObject = (objectId: string) => {
                a_SetStatus(objectId, false)
            }
            //endregion =============================================================================

            //region ======== HELPERS ===============================================================
            //endregion =============================================================================

            return {
                catalogs,
                columns,

                handleCreateObj,
                handleDetailsObject,
                handlerDeleteObj,
                handleEditObject,
                handleEnableObject,
                handleDisableObject
            }
        }
    })
</script>
