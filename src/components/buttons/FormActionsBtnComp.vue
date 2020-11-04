<template>
    <!-- PC MODE -->
    <div class="row d-sm-none d-md-flex">
        <div class="col-md-2 text-sm-center">
            <base-button-comp
                    @click.prevent="$emit('deleteIntent', $event)"
                    class="mr-md-2"
                    buttonType="danger"
                    title="Remove the Catalog">
                <i class="tim-icons icon-trash-simple" style="padding-bottom: 2px; padding-right: 4px;"/>
                DELETE
            </base-button-comp>
        </div>
        <div class="col-md-10 text-sm-center text-md-right">
            <base-button-comp
                    @click.prevent="$emit('cancelIntent', $event)"
                    class="mr-sm0 mr-sm-2"
                    buttonType="default"
                    title="Do nothing">
                <i class="tim-icons icon-simple-remove" style="padding-bottom: 2px; padding-right: 4px;"/>
                CANCEL
            </base-button-comp>
            <base-button-comp
                    @click.prevent="$emit('saveIntent', $event)"
                    class="ml-sm-0 ml-sm-2"
                    buttonType="primary"
                    title="Save the catalog">
                <i class="tim-icons icon-check-2" style="padding-bottom: 2px; padding-right: 4px;"/>
                SAVE
            </base-button-comp>
        </div>
    </div>

    <!-- MOBILE MODE -->
    <div class="row d-md-none d-sm-flex">
        <div class="col-12 text-center">
            <base-button-comp
                    round
                    @click.prevent="$emit('deleteIntent', $event)"
                    class="mr-md-2"
                    buttonType="danger"
                    title="Remove the Catalog">
                <i class="tim-icons icon-trash-simple" style="padding-bottom: 2px; padding-right: 4px;"/>
            </base-button-comp>
            <base-button-comp
                    round
                    @click.prevent="$emit('cancelIntent', $event)"
                    class="ml-sm-2 mr-sm-2"
                    buttonType="default"
                    title="Do nothing">
                <i class="tim-icons icon-simple-remove" style="padding-bottom: 2px; padding-right: 4px;"/>
            </base-button-comp>
            <base-button-comp
                    round
                    @click.prevent="$emit('saveIntent', $event)"
                    class="ml-sm-2"
                    buttonType="primary"
                    title="Save the catalog">
                <i class="tim-icons icon-check-2" style="padding-bottom: 2px; padding-right: 4px;"/>
            </base-button-comp>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import BaseButtonComp from './BaseButtonComp.vue'


    export default defineComponent({
        name: 'FormActionsBtnComp',
        components: { BaseButtonComp },
        emits: ['deleteIntent', 'cancelIntent', 'saveIntent'],
    })

</script>
