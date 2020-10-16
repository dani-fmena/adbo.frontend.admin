import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PluginCollection from './plugins/PluginCollection'
import DirectivesCollection from './directives/DirectivesCollection'


createApp(App)
    .use(store)
    .use(router)
    .use(PluginCollection)
    .use(DirectivesCollection)
    .mount('#app')

// Development purpose !!! thinks this not works with this version
/*App.mixins({
    created() {
        console.log('[created] ' + this.$options.name)
    },
});*/
