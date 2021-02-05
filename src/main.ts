import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import store from './store'
import { createI18n } from 'vue-i18n'
import PluginCollection from './plugins/PluginCollection'
import DirectivesCollection from './directives/DirectivesCollection'
import locales from './services/definitions/locales'


const i18n = createI18n({
    // locale: 'en',                                      // set locale
    locale: 'es',                                      // set locale
    // fallbackLocale: 'es',                              // set fallback locale
    fallbackLocale: 'en',                              // set fallback locale
    messages: locales,                                 // set locale messages
    // ...
})

createApp(App)
.use(store)
.use(i18n)
.use(PluginCollection)
.use(DirectivesCollection)
.use(Toast, {})
.use(router)
.mount('#app')


// Development purpose !!! thinks this not works with this version
/*App.mixins({
    created() {
        console.log('[created] ' + this.$options.name)
    },
});*/
