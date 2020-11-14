<template>
    <div class="form-check">
        <label class="form-check-label">
            <input class="form-check-input" v-bind="$attrs" type="checkbox" @change="handleChkChange">
        <span class="form-check-sign"></span>
        </label>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { ITableChkEmit } from '@/services/definitions/common-types'


    export default defineComponent({
        name: 'ChkboxTableComp',
        props: {
            identifier: {
                type: String,
                description: 'Row object identifier/id'
            }
        },
        methods: {
            handleChkChange (evt: Event) {
                // @ts-ignore
                this.$emit('checkIntent', { newStatus: evt.target!.checked, id: this.identifier } as ITableChkEmit)
            }
        }
    })
</script>
