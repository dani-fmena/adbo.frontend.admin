import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import store from './store'
import PluginCollection from './plugins/PluginCollection'
import DirectivesCollection from './directives/DirectivesCollection'


createApp(App)
    .use(store)
    .use(router)
    .use(PluginCollection)
    .use(DirectivesCollection)
    .use(Toast, {})
    .mount('#app')

// Development purpose !!! thinks this not works with this version
/*App.mixins({
    created() {
        console.log('[created] ' + this.$options.name)
    },
});*/
