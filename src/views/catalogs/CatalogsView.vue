<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">

                <card-comp title="Catalogs">

                    <table-comp
                            table-type="hover"
                            :columns="columns"
                            :data="catalogs"
                            :has-actions="true"/>
                </card-comp>

            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'
    import { useStore } from 'vuex'
    import { CATALOGS_AINVOKER } from '@/store/types/catalogs/catalogs-actions-types'
    import { CATALOGS_GINVOKER } from '@/store/types/catalogs/catalogs-getters-types'
    import { CardComp, TableComp } from '@/components'
    import { HCatalogsTable } from '@/services/definitions/table-headers/catalogs-headers'


    export default defineComponent({
        name: 'DashboardView',
        components: {
            CardComp,
            TableComp
        },
        setup (_) {
            const store = useStore()

            //region ======== DECLARATIONS ==========================================================
            const columns = HCatalogsTable
            //endregion =============================================================================

            //region ======== FETCHING DATA =========================================================
            store.dispatch(CATALOGS_AINVOKER.GET_CATALOGS)
            //endregion =============================================================================

            //region ======== COMPUTATIONS ==========================================================
            const catalogs = computed(() => store.getters[CATALOGS_GINVOKER.catalogs])
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            //endregion =============================================================================

            //region ======== AUX ===================================================================
            //endregion =============================================================================

            return { catalogs, columns }
        }
        /*
        methods: {
            ...mapActions([CATALOGS_AT.ADD_CATALOGS])
        },
        */
    })
</script>
