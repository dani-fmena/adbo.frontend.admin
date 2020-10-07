import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


createApp(App).use(store).use(router).mount('#app')

// Development purpose !!! thinks this not works with this version
/*App.mixins({
    created() {
        console.log('[created] ' + this.$options.name)
    },
});*/
