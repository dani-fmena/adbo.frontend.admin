<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">

                <card-comp title="This is the Catalogs">
                    <p>{{catalogs}}</p>
                    <button @click=ADD_CATALOGS({count:35})>TT</button>
                    <!--<button @click=testCreate>TT</button>-->

                    <table-comp/>

                </card-comp>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { createNamespacedHelpers } from 'vuex'
    import { CATALOGS_AT } from '@/store/types/catalogs/catalogs-actions-types'
    import { CardComp, TableComp } from '@/components'


    const { mapGetters, mapActions } = createNamespacedHelpers('catalogs')

    export default defineComponent({
        name: 'DashboardView',
        components: {
            CardComp,
            TableComp
        },
        computed: {
            ...mapGetters({
                catalogs: 'catalogs'
            })
        },
        methods: {
            /*testCreate () {
             this.$store.dispatch('catalogs/ADD_CATALOGS', { count: 15 })
             },*/

            /*...mapActions({
             test: 'addProduct'
             })*/
            ...mapActions([CATALOGS_AT.ADD_CATALOGS])
        },
        created (): void {
            this.$store.dispatch('catalogs/GET_CATALOGS')
        }
    })
</script>
