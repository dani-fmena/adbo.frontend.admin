<template>
    <transition appear name="page-fade">

        <div class="row">
            <div class="col-12">
                <card-comp :hasFormBackBtn="true" v-on:doClick="handleBack">

                    <!--  FORM  -->
                    <Form class="form-horizontal" @submit="handleSubmit" :validation-schema="VSCHEMA" :initial-values="iniFormData">
                    <!--<form @submit.prevent class="form-horizontal">-->
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
                        <form-actions-btn-comp v-on:deleteIntent="handleDelete" v-on:cancelIntent="handleCancel" />

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
    import { CATALOGS_AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
    import useToastify from '@/services/composables/useToastify'
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
            const { mkCatalog } = useFactory()
            //endregion =============================================================================

            //region ======== VALIDATION ============================================================
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
            const a_CreateCatalog = (newCatalog: Partial<ICatalog>): void => {
                store.dispatch(CATALOGS_AINVOKER.ADD_CATALOGS, { catalog: newCatalog })
                .then((catalog: ICatalog) => {
                    tfyBasicSuccess('Catalog', OPSKind.addition, catalog.name)
                    handleBack()
                })
                .catch((error) => {tfyBasicFail(error, 'Catalog', OPSKind.addition)})
            }
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            const iniFormData = fmode === FORMMODE.create ? mkCatalog() : catalogs.value.dic[id as string]
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const handleSubmit = (formData: Partial<ICatalog>) => {a_CreateCatalog(formData)}
            const handleBack = () => {router.push({ name: PATH_NAMES.catalogs })}
            const handleCancel = () => {router.push({ name: PATH_NAMES.catalogs })}
            const handleDelete = () => {console.log('deleting')}
            //endregion =============================================================================

            return {
                VSCHEMA,
                iniFormData,

                handleSubmit,
                handleBack,
                handleDelete,
                handleCancel,
            }
        }
    })
</script>
