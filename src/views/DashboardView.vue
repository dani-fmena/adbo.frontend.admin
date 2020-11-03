<template>
    <transition appear name="page-fade">
    <div class="row">
        <div class="col-12">
            <h2>This is the dashboard</h2>
            <!--<div class="progress-bar progress progress-bar-animated progress-bar-striped" role="progressbar" style="width: 25%"></div>-->
        </div>
    </div>
    </transition>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'DashboardView',
        components: {},
    })
</script>
