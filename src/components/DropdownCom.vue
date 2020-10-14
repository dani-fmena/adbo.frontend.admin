<template>

</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'DropdownCom',
        props: {
            tag: {
                type: String,
                default: 'div',
                description: 'Dropdown html tag (e.g div, ul etc)'
            },
            titleTag: {
                type: String,
                default: 'button',
                description: 'Dropdown title (toggle) html tag'
            },
            title: {
                type: String,
                description: 'Dropdown title'
            },
            icon: {
                type: String,
                description: 'Dropdown icon'
            },
            titleClasses: {
                type: [String, Object, Array],
                description: 'Title css classes'
            },
            menuClasses: {
                type: [String, Object],
                description: 'Menu css classes'
            },
            menuOnRight: {
                type: Boolean,
                description: 'Whether menu should appear on the right'
            },
            ariaLabel: String
        },
        data () {
            return {
                isOpen: false
            }
        },
        methods: {
            toggleDropDown () {
                this.isOpen = !this.isOpen
                this.$emit('change', this.isOpen)
            },
            closeDropDown () {
                this.isOpen = false
                this.$emit('change', false)
            }
        }
    })
</script>

<style scoped lang="sass">

</style>
