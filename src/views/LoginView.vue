<template>

    <div class="label-container">
        <h1 class="label-justify">AdbO</h1>
        <h5 class="label-justify" style="font-style: italic">Administration App</h5>
    </div>

    <card-comp title="Login" card-type="auto-margin">

        <form>
            <div class="form-group has-label">
                <label for="user"> Email address </label>
                <input id="user" name="user" type="text" placeholder="User" class="form-control">
            </div>
            <div class="form-group has-label">
                <label for="password"> Password </label>
                <input id="password" name="password" type="password" placeholder="Password" class="form-control">
            </div>
        </form>

        <template v-slot:footer>
            <base-button block button-type="primary" @doClick.prevent="handleClick">Submit</base-button>
        </template>

    </card-comp>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import { CardComp, BaseButton } from '../components'
    import { PathStrings } from '@/router/paths-strings'
    import router from '../router'

    export default defineComponent({
        name: 'LoginView',
        components: {
            CardComp,
            BaseButton
        },
        methods: {

            //region ======== NAVIGATION ============================================================
            goToDashboard (): void {
                router.push({ name: PathStrings.dashboard })
            },
            //endregion =============================================================================

            //region ======== HANDLERS ==============================================================
            handleClick (): void {
                this.goToDashboard()
            },
            //endregion =============================================================================
        }
    });
</script>


<style scoped lang="scss">
    h5 {
        margin-bottom: 26px;
    }

    .label-justify {
        text-align: center;
    }

    .label-container {
        margin: auto;
        width: 40%;
    }
</style>
