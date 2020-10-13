<template>
    <component :is="tag" @click.prevent="hideSideBar" class="nav-item" v-bind="$attrs" tag="li">
        <a class="nav-link">
            <slot>
                <i v-if="icon" :class="icon"></i>
                <p>{{name}}</p>
            </slot>
        </a>
    </component>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'SidebarLinkPlugComp',
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
            isActive() : Boolean {
                return this.$el.prototype.classList.contains('active')
            }
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
