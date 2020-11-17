<template>
    <div style="text-align: right">
        <!-- DETAILS -->
        <button @click.prevent="$emit('detailsIntent', identifier)"
                type="button"
                class="btn like btn-link btn-icon btn-fab btn-info btn-sm">
            <i class="tim-icons icon-heart-2"></i>
        </button>

        <!-- EDIT -->
        <button @click.prevent="$emit('editIntent', identifier)"
                type="button"
                class="btn edit btn-link btn-icon btn-fab btn-warning btn-sm">
            <i class="tim-icons icon-pencil"></i>
        </button>

        <!-- DELETE -->
        <button @click.prevent="$emit('deleteIntent', identifier)"
                type="button"
                class="btn remove btn-link btn-icon btn-fab btn-danger btn-sm">
            <i class="tim-icons icon-trash-simple"></i>
        </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'RowActionsComp',
        props: {
            identifier: {
                type: String,
                description: 'Row object identifier/id'
            }
        },
    })
</script>
