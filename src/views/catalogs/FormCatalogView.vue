<template>
    <transition appear name="page-fade">

        <div class="row">
            <div class="col-12">
                <card-comp :hasFormBackBtn="true" v-on:doClick="handleBack">

                    <!--  FORM  -->
                    <!--<form @submit.prevent class="form-horizontal">-->
                    <Form class="form-horizontal" @submit="handleSubmit" :validation-schema="VSCHEMA" :initial-values="iniFormData">

                        <div class="row" v-if:="cmptdFmode === FORMMODE.edit">
                            <label class="text-sm-left text-md-right col-md-3 col-form-label">ID</label>
                            <div class="col-md-9">
                                <basic-input-comp disabled placeholder="###########" name="_id" type="text" />
                            </div>
                        </div>

                        <div class="row">
                            <label class="text-sm-left text-md-right col-md-3 col-form-label">Name</label>
                            <div class="col-md-9">
                                <basic-input-comp placeholder="The name of the catalog" name="name" type="text" />
                            </div>
                        </div>

                        <div class="row">
                            <label class="text-sm-left text-md-right col-md-3 col-form-label">Status</label>
                            <div class="col-md-9">
                                <basic-checkbox-comp name="isEnable" :checked="iniFormData.isEnable" :labels="['Active', 'Disabled']" />
                            </div>
                        </div>

                        <!-- FORM ACTIONS BUTTONS -->
                        <form-actions-btn-comp :show-delete="cmptdFmode === FORMMODE.edit"
                                               v-on:deleteIntent="handleDelete"
                                               v-on:cancelIntent="handleCancel" />

                    </Form>
                </card-comp>
            </div>
        </div>

    </transition>
</template>

<script lang="ts">
    import { computed, ComputedRef, defineComponent } from 'vue'
    import { Field, Form } from 'vee-validate'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { BasicInputComp, CardComp, FormActionsBtnComp, BasicCheckboxComp } from '@/components'
    import { useToast } from 'vue-toastification'
    import { VSCHEMA } from './validation'
    import { PATH_NAMES } from '@/router/paths'
    import { FORMMODE, IShell, OPSKind } from '@/services/definitions'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'
    import { CATALOGS_GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import { AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
    import useToastify from '@/services/composables/useToastify'
    import useDialogfy from '@/services/composables/useDialogfy'
    import useFactory from '@/services/composables/useFactory'


    export default defineComponent({
        name: 'EditCatalogView',
        components: {
            Form,
            Field,
            CardComp,
            BasicInputComp,
            BasicCheckboxComp,
            FormActionsBtnComp
        },
        setup () {
            //region ======== DECLARATIONS ==========================================================
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const { fmode, id } = route.params
            const toast = useToast()                                       // The toast lib interface

            const { tfyBasicSuccess, tfyBasicFail } = useToastify(toast)
            const { dfyDeleteConfirmations } = useDialogfy()
            const { mkCatalog } = useFactory()
            //endregion =============================================================================

            //region ======== VALIDATION ============================================================
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
            const a_Create = (newCatalog: Partial<ICatalog>): void => {
                store.dispatch(AINVOKER.ADD_CATALOGS, { catalog: newCatalog })
                .then((catalog: ICatalog) => {
                    tfyBasicSuccess('Catalog', OPSKind.addition, catalog.name)
                    handleBack()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', OPSKind.addition)})
            }
            const a_Edit = (newCatalog: Partial<ICatalog>): void => {
                store.dispatch(AINVOKER.EDIT_CATALOGS, { catalog: newCatalog })
                .then((catalog: ICatalog) => {
                    tfyBasicSuccess('Catalog', OPSKind.updating, catalog.name)
                    handleBack()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', OPSKind.updating)})
            }
            const a_Delete = (catalogId: string): void => {
                store.dispatch(AINVOKER.DEL_CATALOGS, { id: catalogId })
                .then((deletedObj: ICatalog) => {
                    tfyBasicSuccess('Catalog', OPSKind.deletion, deletedObj.name)
                    handleBack()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', OPSKind.deletion)})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const cmptdFmode: ComputedRef<string | string[]> = computed(() => fmode)
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            const iniFormData = fmode === FORMMODE.create ? mkCatalog() : catalogs.value.dic[id as string]
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const handleSubmit = (formData: Partial<ICatalog>) => {
                if(fmode == FORMMODE.create) a_Create(formData)
                if (fmode == FORMMODE.edit) a_Edit(formData)
            }
            const handleBack = () => {router.push({ name: PATH_NAMES.catalogs })}
            const handleCancel = () => {router.push({ name: PATH_NAMES.catalogs })}
            const handleDelete = () => {
                if (fmode)
                    dfyDeleteConfirmations('Catalog', iniFormData._id as string, a_Delete, iniFormData.name)
            }
            //endregion =============================================================================

            return {
                VSCHEMA,
                iniFormData,

                cmptdFmode,                                                         // Computed form mode
                FORMMODE,

                handleSubmit,
                handleBack,
                handleDelete,
                handleCancel,
            }
        }
    })
</script>
