<template>
    <div class="main-panel">
        <div class="content-page">

            <!-- CONTENT -->
            <slot />

        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'BasePageLay',
    })
</script>
