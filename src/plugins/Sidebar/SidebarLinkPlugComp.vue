<template>
    <component :is="tag" @click.prevent="hideSideBar" class="nav-item" v-bind="$attrs" custom v-slot="{ href, route, navigate, isActive, isExactActive }">
        <li role="link" class="nav-item" :class="[isActive && 'active router-link-active', isExactActive && 'router-link-exact-active']">
            <a class="nav-link" :href="href" @click="navigate">
                <slot>
                    <i v-if="icon" :class="icon"></i>
                    <p>{{name}}</p>
                </slot>
            </a>
        </li>
    </component>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'SidebarLinkPlugComp',
        inheritAttrs: false,
        props: {
            name: String,
            icon: String,
            tag: {
                type: String,
                default: 'router-link'
            }
        },
        inject: {
            autoClose: {
                default: true
            },
            addLink: {
                default: () => {}
            },
            removeLink: {
                default: () => {}
            }
        },
        methods: {
            hideSideBar(): void {
                //@ts-ignore
                if(this.autoClose) this.$sidebar.displaySidebar(false);
            },
        },
        mounted (): void {
            //@ts-ignore
            if (this.addLink) this.addLink(this)
        },
        beforeUnmount (): void {
            if (this.$el && this.$el.parentNode) this.$el.parentNode.removeChild(this.$el)
            //@ts-ignore
            if (this.removeLink) this.removeLink(this);
        }
    })
</script>

<style scoped>
</style>
