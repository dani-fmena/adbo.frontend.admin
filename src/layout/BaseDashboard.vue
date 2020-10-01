<template>
    <div class="content a">
        <slot/>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'BaseDashboard',
    })
</script>
