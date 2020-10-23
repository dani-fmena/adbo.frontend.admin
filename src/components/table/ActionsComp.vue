<template>
    <div style="text-align: right">
        <button type="button" class="btn like btn-link btn-icon btn-fab btn-info btn-sm">
            <i class="tim-icons icon-heart-2"></i>
        </button>
        <button type="button" class="btn edit btn-link btn-icon btn-fab btn-warning btn-sm">
            <i class="tim-icons icon-pencil"></i>
        </button>
        <button type="button" class="btn remove btn-link btn-icon btn-fab btn-danger btn-sm">
            <i class="tim-icons icon-simple-remove"></i>
        </button>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'ActionsComp'
    })
</script>

<style scoped>

</style>
