<template>
    <div class="content base page">
        <slot/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'BasePage',
    })
</script>
