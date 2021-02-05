<template>

    <div class="label-container">
        <h1 class="label-justify">AdbO</h1>
        <h5 class="label-justify" style="font-style: italic">{{ t('others.adm_system') }}</h5>
    </div>

    <card-comp card-type="auto-margin">
        <form>
            <div class="form-group">
                <basic-input-comp id="user" name="username" type="text" :placeholder="t('others.user')"/>
            </div>
            <div class="form-group has-label">
                <basic-input-comp id="password" name="password" type="password" :placeholder="t('others.pass')" v-on:keydown.enter="h_LoginIntent"/>
            </div>
        </form>

        <template v-slot:footer>
            <base-button-comp block button-type="primary" @doClick.prevent="h_LoginIntent">{{ cap(t('others.login')) }}</base-button-comp>
        </template>
    </card-comp>

</template>

<script lang="ts">
    import { defineComponent } from 'vue'
    import { useI18n } from 'vue-i18n'
    import { useStore } from 'vuex'
    import { useRouter } from 'vue-router'
    import { useForm } from 'vee-validate'
    import { useToast } from 'vue-toastification'
    import { BaseButtonComp, BasicInputComp, CardComp } from '@/components'
    import { IAuthFormData } from '@/store/types/auth/auth-types'
    import { AINVOKER } from '@/store/types/auth/auth-actions-types'
    import { VSCHEMA } from '@/views/auth/validation'
    import { PATH_NAMES } from '@/router/paths'
    import useToastify from '@/services/composables/useToastify'
    import useCommon from '@/services/composables/useCommon'


    export default defineComponent({
        name: 'LoginView',
        components: {
            CardComp,
            BaseButtonComp,
            BasicInputComp
        },
        setup () {
            //region ======== DECLARATIONS & LOCAL STATE ============================================
            const { t } = useI18n({ useScope: 'global' })
            const store = useStore()
            const router = useRouter()
            const toast = useToast()                                        // The toast lib interface

            const { tfyAuthFail } = useToastify(toast)
            const { cap } = useCommon()
            const { handleSubmit } = useForm<IAuthFormData>({ validationSchema: VSCHEMA })
            //endregion =============================================================================

            //region ======== ACTIONS ===============================================================
            const a_reqAccess = (data: IAuthFormData) => {
                store.dispatch(AINVOKER.LOGIN, data)
                .then(() => { goToDashboard() })
                .catch((error) => {tfyAuthFail(error)})
            }
            //endregion =============================================================================

            //region ======== NAVIGATION ============================================================
            const goToDashboard = () => {router.push({ name: PATH_NAMES.dashboard })}
            //endregion =============================================================================

            //region ======== EVENTS HANDLERS =======================================================
            const h_LoginIntent = handleSubmit(formData => {a_reqAccess(formData)})
            //endregion =============================================================================

            return {
                h_LoginIntent,

                cap,
                t
            }
        }
    })
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
