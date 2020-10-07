<template>
    <div id="nav">
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/default">Default</router-link>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'SideBarComp',
    });
</script>
