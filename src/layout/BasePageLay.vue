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
    import PerfectScrollbar from 'perfect-scrollbar'

    export default defineComponent({
        name: 'BasePageLay',
        mounted (): void {
            new PerfectScrollbar('.main-panel')
        }
    })
</script>
