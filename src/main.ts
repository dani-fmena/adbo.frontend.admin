import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from 'vue-toastification'
import store from './store'
import PluginCollection from './plugins/PluginCollection'
import DirectivesCollection from './directives/DirectivesCollection'


// Development purpose !!! thinks this not works with this version

createApp(App)
.use(store)
.use(PluginCollection)
.use(DirectivesCollection)
.use(Toast, {})
.use(router)
.mount('#app')
/*App.mixins({
    created() {
        console.log('[created] ' + this.$options.name)
    },
});*/
