<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">
                <card-comp title="Catalogs">

                    <!-- DATA TABLE -->
                    <table-comp
                            table-type="hover"

                            v-on:deleteIntent="handlerDeleteObj"
                            v-on:detailsIntent="handleDetailsObject"
                            v-on:editIntent="handleEditObject"

                            :columns="columns"
                            :data="catalogs"
                            :has-actions="true" />
                </card-comp>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent, computed, ComputedRef } from 'vue'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { PATH_NAMES } from '@/router/paths'
    import { CardComp, TableComp } from '@/components'
    // import useAlert from '../../services/composables/useAlert'
    // import { useToast } from "vue-toastification";
    import { CATALOGS_AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
    import { CATALOGS_GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import { HCatalogsTable } from '@/services/definitions/table-headers/catalogs-headers'


    export default defineComponent({
        name: 'DashboardView',
        components: {
            CardComp,
            TableComp
        },
        setup (_) {
            //region ======== DECLARATIONS ==========================================================
            const store = useStore()
            const router = useRouter()
            const columns = HCatalogsTable
            // const toast = useToast()                                       // The toast lib interface

            // const { ShowAlertPrimary } = useAlert(toast)
            //endregion =============================================================================

            //region ======== FETCHING DATA =========================================================
            store.dispatch(CATALOGS_AINVOKER.GET_CATALOGS)
            //endregion =============================================================================

            //region ======== COMPUTATIONS ==========================================================
            const catalogs: ComputedRef = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const handlerDeleteObj = (objectId: string) => {
                console.log('delete from container', objectId)
            }
            const handleDetailsObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsDetails, params: { id: objectId } })
            }
            const handleEditObject = (objectId: string) => {
                router.push({ name: PATH_NAMES.catalogsEdit, params: { id: objectId } })
            }

            // Notifications example
            // ShowAlertPrimary('This is the message')
            //endregion =============================================================================

            //region ======== AUX ===================================================================
            //endregion =============================================================================

            return {
                catalogs,
                columns,

                handleDetailsObject,
                handlerDeleteObj,
                handleEditObject,
            }
        }
        /*
         methods: {
         ...mapActions([CATALOGS_AT.ADD_CATALOGS])
         },
         */
    })
</script>
