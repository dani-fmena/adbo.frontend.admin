<template>
    <transition appear name="page-fade">

        <div class="row">
            <div class="col-12">
                <card-comp :hasFormBackBtn="true" v-on:doClick="h_Back">

                    <!--  FORM  -->
                    <!--<VeeForm  v-slot="{ handleSubmit }" :validation-schema="VSCHEMA" :initial-values="iniFormData">-->
                    <!--https://vee-validate.logaretm.com/v4/guide/handling-forms#using-handlesubmit-->
                    <form class="form-horizontal">
                        <div class="row" v-if:="cmptdFmode === 'edit'">
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
                    </form>
                    <!--</VeeForm>-->

                    <!--v-on:saveIntent="handleSubmit($event, doSubmit)"-->
                    <!-- FORM ACTIONS BUTTONS -->
                    <template v-slot:footer>
                        <form-actions-btn-comp :show-delete="cmptdFmode === 'edit'"
                                               v-on:saveIntent="doSubmit"
                                               v-on:deleteIntent="h_Delete"
                                               v-on:cancelIntent="h_Cancel" />
                    </template>

                </card-comp>
            </div>
        </div>

    </transition>
</template>

<script lang="ts">
    import { computed, ComputedRef, defineComponent } from 'vue'
    import { Field, useForm } from 'vee-validate'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { BasicInputComp, CardComp, FormActionsBtnComp, BasicCheckboxComp } from '@/components'
    import { useToast } from 'vue-toastification'
    import { VSCHEMA } from './validation'
    import { PATH_NAMES } from '@/services/definitions/route-paths'
    import { FormMode, IShell } from '@/services/definitions'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'
    import { GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import { AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
    import useToastify from '@/services/composables/useToastify'
    import useDialogfy from '@/services/composables/useDialogfy'
    import useFactory from '@/services/composables/useFactory'


    export default defineComponent({
        name: 'FormCatalogView',
        components: {
            Field,
            CardComp,
            BasicInputComp,
            BasicCheckboxComp,
            FormActionsBtnComp
        },
        setup () {
            //region ======== DECLARATIONS & LOCAL STATE ============================================
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
                    tfyBasicSuccess('Catalog', 'addition', catalog.name)
                    h_Back()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', 'addition')})
            }
            const a_Edit = (newCatalog: Partial<ICatalog>): void => {
                store.dispatch(AINVOKER.EDIT_CATALOGS, { catalog: newCatalog })
                .then((catalog: ICatalog) => {
                    tfyBasicSuccess('Catalog', 'update', catalog.name)
                    h_Back()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', 'update')})
            }
            const a_Delete = (catalogId: string): void => {
                store.dispatch(AINVOKER.DEL_CATALOGS, { id: catalogId })
                .then((deletedObj: ICatalog) => {
                    tfyBasicSuccess('Catalog', 'deletion', deletedObj.name)
                    h_Back()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', 'deletion')})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const cmptdFmode: ComputedRef<string | string[]> = computed(() => fmode)
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[GINVOKER.catalogs])
            const iniFormData = cmptdFmode.value === 'create' as FormMode ? mkCatalog() : catalogs.value.dic[id as string]
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const { handleSubmit, meta } = useForm<Partial<ICatalog>>({ validationSchema: VSCHEMA, initialValues: iniFormData })
            const doSubmit = handleSubmit(formData => {
                if (cmptdFmode.value == 'create' as FormMode) a_Create(formData)
                if (cmptdFmode.value == 'edit' as FormMode && meta.value.dirty) a_Edit(formData)
                if (cmptdFmode.value == 'edit' as FormMode && !meta.value.dirty) h_Back()
            })
            const h_Back = () => {
                // router.back()
                router.push({ name: PATH_NAMES.catalogs })
            }
            const h_Cancel = () => {router.push({ name: PATH_NAMES.catalogs })}
            const h_Delete = () => {
                if (fmode)
                    dfyDeleteConfirmations('Catalog', iniFormData._id as string, a_Delete, iniFormData.name)
            }
            //endregion =============================================================================

            return {
                iniFormData,

                cmptdFmode,                                                         // Computed form mode

                doSubmit,
                h_Back,
                h_Delete,
                h_Cancel,
            }
        }
    })
</script>
