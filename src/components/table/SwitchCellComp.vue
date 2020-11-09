<template>
    <div style="text-align: center">
        <!-- ENABLE -->
        <button @click.prevent="handleEnableIntent"
                type="button"
                class="btn like btn-link btn-icon btn-fab btn-sm"
                :class="[{'btn-default': !isEnable}, {'btn-success': isEnable}]">
            <i class="tim-icons icon-check-2"></i>
        </button>

        <!-- DISABLE -->
        <button @click.prevent="handleDisableIntent"
                type="button"
                class="btn edit btn-link btn-icon btn-fab btn-sm"
                :class="[{'btn-default': isEnable}, {'btn-warning': !isEnable}]">
            <i class="tim-icons icon-simple-remove"></i>
        </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'SwitchCellComp',
        props: {
            identifier: {
                type: String,
                description: 'Row object identifier/id'
            },
            isEnable: {
                type: Boolean,
                description: 'The status of the row object'
            }
        },
        methods: {
            handleEnableIntent() {if(!this.isEnable) this.$emit('enableIntent', this.identifier)},
            handleDisableIntent() {if(this.isEnable) this.$emit('disableIntent', this.identifier)}
        }
    })
</script>
