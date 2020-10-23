<template>
    <transition appear name="page-fade">
        <div class="row">
            <div class="col-12">

                <card-comp title="Catalogs">
                    <table-comp
                            table-type="hover"
                            :columns="columns"
                            :data="data"
                            :has-actions="true"/>

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
        data () {
            return {
                columns: [
                    { title: 'Name' },
                    { title: 'Email' },
                    { title: 'Age' },
                    { title: 'Salary' },
                    { title: 'Actions', toRight: true }
                ],
                data: [
                    {
                        name: 'Daniel',
                        email: 'ashigaruconyaey@gmail.com',
                        age: '35',
                        salary: '€ 45.80',
                    },
                ]
            }
        },
        computed: {
            ...mapGetters({
                catalogs: 'catalogs'
            })
        },
        methods: {
            ...mapActions([CATALOGS_AT.ADD_CATALOGS])
        },
        created (): void {
            this.$store.dispatch('catalogs/GET_CATALOGS')
        }
    })
</script>
