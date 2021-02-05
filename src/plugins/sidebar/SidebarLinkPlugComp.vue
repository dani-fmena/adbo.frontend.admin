<template>
    <component :is="tag" class="nav-item" v-bind="$attrs" v-slot="{ href, route, navigate, isActive, isExactActive }">

        <li :class="[isActive && 'active router-link-active', isExactActive && 'router-link-exact-active']">
            <a class="nav-link" :class="[!sub && 'main-link']" :href="href" @click.prevent="hideSideBar(navigate)">

                <slot>
                    <!--MAIN LINK-->
                    <template v-if="icon && !sub">
                        <i :class="icon"></i><p>{{ name }}</p>
                    </template>

                    <!--SUB LINK-->
                    <template v-else-if="icon && sub === true">
                        <span class="sub-link-letter" style="margin-left: 6%">{{ icon }}</span><span class="sub-link" style="margin-left: 12%">{{ name }}</span>
                    </template>
                </slot>

            </a>
        </li>

    </component>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { Function0 } from '@/services/definitions'


    export default defineComponent({
        name: 'SidebarLinkPlugComp',
        inheritAttrs: false,
        props: {
            name: String,
            icon: String,
            sub: {
                type: Boolean,
                default: true,
                description: 'If the link a sub link or main sidebar link',
            },
            tag: {
                type: String,
                default: 'router-link'
            }
        },
        inject: {
            autoClose: {
                default: true
            },
        },
        methods:{
            hideSideBar(go: Function0): void {
                //@ts-ignore
                if(this.autoClose) this.$sidebar.displaySidebar(false);

                go() // do navigation
            },
        },
    })
</script>
