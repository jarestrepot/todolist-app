import { createApp } from 'vue'
import router  from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { i18n } from './traductions/implement'
import App from './App.vue'
import '/main.css'

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate)

app.use(i18n)
app.use(pinia)
app.use(router)
app.mount('#app');
