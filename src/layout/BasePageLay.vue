<template>
    <div class="main-panel">
        <div class="content-page">

            <!-- Page Content -->
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
