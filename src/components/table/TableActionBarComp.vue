<template>
    <div class="table-action-bars col-12 d-flex" style="margin-bottom: 12px;">
        <!-- all the modes values responds to the 'actionBarMode' TableComp.vue prop -->

        <!-- DEFAULT MODE -->
        <template v-if="mode === 'default'">
            <div class="col-1 p-0" style="text-align: end">
                <base-button-comp
                        icon
                        @doClick="$emit('navCreateIntent')"
                        buttonType="primary"
                        title="Create New">
                    <i class="tim-icons icon-simple-add"></i>
                </base-button-comp>
            </div>
        </template>

        <!-- EDR MODE, enable disable remove -->
        <template v-else-if="mode === 'edr'">
            <div class="col-11 p-0">
                <transition name="slide-fade">
                    <div v-show="chkCount > 1" >
                    <base-button-comp
                            icon
                            class="mr-1"
                            @doClick="$emit('enableChkCollIntent')"
                            buttonType="success"
                            title="Enable Selection">
                        <i class="tim-icons icon-check-2"></i>
                    </base-button-comp>
                    <base-button-comp
                            icon
                            class="ml-1 mr-1"
                            @doClick="$emit('disableChkCollIntent')"
                            buttonType="warning"
                            title="Disable Selection">
                        <i class="tim-icons icon-simple-remove"></i>
                    </base-button-comp>
                    <base-button-comp
                            icon
                            class="ml-1"
                            @doClick="$emit('removeChkCollIntent')"
                            buttonType="danger"
                            title="Remove Selection">
                        <i class="tim-icons icon-trash-simple"></i>
                    </base-button-comp>
                    </div>
                </transition>
            </div>

            <div class="col-1 p-0" style="text-align: end">
                <base-button-comp
                        icon
                        @doClick="$emit('navCreateIntent')"
                        buttonType="primary"
                        title="Create New">
                    <i class="tim-icons icon-simple-add"></i>
                </base-button-comp>
            </div>
        </template>

    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { BaseButtonComp } from '@/components'


    export default defineComponent({
        name: 'TableActionBarComp',
        components: {BaseButtonComp},
        props: {
            mode: {
                type: String,
                default: 'default',
                description: "The mode (sets of buttons) to show in the table top action bar",
            },
            chkCount: {
                type: Number,
                default: 0,
                description: "The count of the selected/checked items",
            },
        },
        emits: ['navCreateIntent', 'enableChkCollIntent', 'disableChkCollIntent', 'removeChkCollIntent']
    })
</script>

<style scoped>

</style>
