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
    import { CATALOGS_AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
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
            store.dispatch(CATALOGS_AINVOKER.GET_CATALOGS)
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
            const a_Delete = (catalogId: string): void => {
                store.dispatch(CATALOGS_AINVOKER.DEL_CATALOGS, { id: catalogId })
                .then((deletedObj: ICatalog) => {
                    tfyBasicSuccess('Catalog', OPSKind.deletion, deletedObj.name)
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', OPSKind.deletion)})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const handleCreateObj = () => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: FORMMODE.create, id: '', tname: 'Create Catalog' } })
            }
            const handlerDeleteObj = (objectId: string) => {
                dfyDeleteConfirmations('Catalog', objectId, a_Delete, catalogs.value.dic[objectId].name)
            }
            const handleDetailsObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsDetails, params: { id: objectId } })
            }
            const handleEditObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsForm, params: { fmode: FORMMODE.edit, id: objectId, tname: 'Edit Catalog'  } })
            }
            const handleEnableObject = (objectId: string) => {console.log('enable intent to', objectId)}
            const handleDisableObject = (objectId: string) => {console.log('disable intent to', objectId)}
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
