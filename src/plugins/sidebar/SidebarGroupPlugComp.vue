<template>
    <li class="nav-item">
        <a class="nav-link" @click="h_ToggleDropdown">
            <slot>
                <i v-if="icon" :class="icon"></i>
                <p>
                    {{name}}
                    <transition name="caret-rotate">
                        <b v-if="!isOpen" class="caret"></b>
                    </transition>
                     <!--This is an alternative solution, yo can go only with the carets of above -->
                    <!--<transition name="caret-up-fade">-->
                    <!--    <b v-if="isOpen" class="caret" style="transform: rotate(180deg)"></b>-->
                    <!--</transition>-->
                </p>
            </slot>
        </a>

        <!-- SUB LINKS -->
        <div class="collapsable" :ref="name" :style="[isOpen ? { height : computedHeight } : {}]">
            <ul class="nav">
                <slot name="sublinks">
                </slot>
            </ul>
        </div>
    </li>
</template>

<script lang="ts">
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'SidebarGroupPlugComp',
        inheritAttrs: false,
        props: {
            name: String,
            icon: String,
        },
        data () {
            return {
                computedHeight: '',
                isOpen: false
            }
        },
        methods: {
            h_ToggleDropdown (): void {this.isOpen = !this.isOpen},
            _initHeight (): void {
                // This is hacky and ugly, but works, and it's execute only once per group, so I think is not that bad
                // An alternative way to do this -> https://github.com/ivanvermeyen/vue-collapse-transition | https://jsfiddle.net/rezaxdi/sxgyj1f4/3/ | https://markus.oberlehner.net/blog/transition-to-height-auto-with-vue/

                // @ts-ignore
                this.$refs[this.$props.name].style.height = 'auto'
                // @ts-ignore
                this.$refs[this.$props.name!].style.position = 'absolute'
                // @ts-ignore
                this.$refs[this.$props.name!].style.visibility = 'hidden'
                // @ts-ignore
                this.$refs[this.$props.name!].style.display = 'block'

                // @ts-ignore
                this.computedHeight = this.$refs[this.$props.name!].children![0].children.length * 46 + 'px'

                // @ts-ignore
                this.$refs[this.$props.name!].style.position = null
                // @ts-ignore
                this.$refs[this.$props.name!].style.visibility = null
                // @ts-ignore
                this.$refs[this.$props.name!].style.display = null
                // @ts-ignore
                this.$refs[this.$props.name!].style.height = 0
            }
        },
        mounted (): void {this._initHeight()}
    })
</script>

<style scoped lang="scss">
</style>
