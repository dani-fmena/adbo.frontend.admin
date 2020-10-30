<template>

    <div></div>


</template>

<script lang="ts">
    import { defineComponent } from 'vue'


    export default defineComponent({
        name: 'AlertPlugComp',
        props: {
            message: String,
            title: String,
            icon: String,
            timeout: {
                type: Number,
                default: 5000,

                validator: (value:any) => {return value >= 0}
            },
            timestamp: {
                type: Date,
                default: () => new Date()
            },
            component: {
                type: [Object, Function]
            },
            showClose: {
                type: Boolean,
                default: true
            },
            closeOnClick: {
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: 'info',

                validator: (value: any) => {
                    let acceptedValues = ['info', 'primary', 'danger', 'warning', 'success']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            verticalAlign: {
                type: String,
                default: 'top',

                validator: (value: any) => {
                    let acceptedValues = ['top', 'bottom']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            horizontalAlign: {
                type: String,
                default: 'right',

                validator: (value: any) => {
                    let acceptedValues = ['left', 'center', 'right']
                    return acceptedValues.indexOf(value) !== -1
                }
            },
            clickHandler: Function
        },
        methods: {},
        computed: {
            hasIcon (): boolean {
                return !this.icon ? false : this.icon.length > 0
            },
            alertType (): string {
                return `alert-${ this.type }`
            },

        },
        data () {
            return {
                elmHeight: 0
            }
        },
        /*customPosition() {
            let initialMargin = 20;
            let alertHeight = this.elmHeight + 10;
            let sameAlertsCount = this.$notifications.state.filter(alert => {
                return (
                    alert.horizontalAlign === this.horizontalAlign &&
                    alert.verticalAlign === this.verticalAlign &&
                    alert.timestamp <= this.timestamp
                );
            }).length;
            if (this.$notifications.settings.overlap) {
                sameAlertsCount = 1;
            }
            let pixels = (sameAlertsCount - 1) * alertHeight + initialMargin;
            let styles = {};
            if (this.verticalAlign === 'top') {
                styles.top = `${pixels}px`;
            } else {
                styles.bottom = `${pixels}px`;
            }
            return styles;
        }*/
    })

</script>

<style scoped lang="scss">
</style>
