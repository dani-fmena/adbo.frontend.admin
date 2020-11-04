<template>
    <transition appear name="page-fade">

        <div class="row" :key="1">
            <div class="col-12">
                <card-comp :hasFormBackBtn="true" v-on:doClick="handleBack">

                    <!--  FORM  -->


                    <!-- FORM/CARD FOOTER -->
                    <template v-slot:footer>
                        <form-actions-btn-comp v-on:deleteIntent="handleDelete"
                                               v-on:cancelIntent="handleCancel"
                                               v-on:saveIntent="handleSave" />
                    </template>

                </card-comp>
            </div>
        </div>

    </transition>
</template>

<script lang="ts">
    import { computed, ComputedRef, defineComponent } from 'vue'
    import { useRoute, useRouter } from 'vue-router'
    import { useStore } from 'vuex'
    import { CardComp, FormActionsBtnComp } from '@/components'
    import { IShell } from '@/services/definitions'
    import { ICatalog } from '@/store/types/catalogs/catalogs-types'
    import { CATALOGS_GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import { PATH_NAMES } from '@/router/paths'

    export default defineComponent({
        name: 'EditCatalogView',
        components: {
            CardComp,
            FormActionsBtnComp
        },
        setup () {

            //region ======== DECLARATIONS ==========================================================
            const store = useStore()
            const route = useRoute()
            const router = useRouter()
            const { mode, id } = route.params
            //endregion =============================================================================

            //region ======== COMPUTATIONS & GETTERS ================================================
            const catalogs: ComputedRef<IShell<ICatalog>> = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const handleBack = () => {router.push({ name: PATH_NAMES.catalogs })}
            const handleCancel = () => {router.push({ name: PATH_NAMES.catalogs })}
            const handleDelete = () => {
                console.log('deleting')
            }
            const handleSave = () => {
                console.log('saving')
            }
            //endregion =============================================================================

            console.log(catalogs.value.dic[id as string])
            console.log(mode, id)

            return {

                handleBack,
                handleDelete,
                handleCancel,
                handleSave

            }
        }
    })
</script>
