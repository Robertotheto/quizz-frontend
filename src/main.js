import './index.css'

import axios from 'axios'
import { createPinia } from 'pinia'
import {createApp, markRaw} from 'vue'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'
import { useAuth } from "@/stores/auth.js"
import {useRouter} from 'vue-router'

const app = createApp(App)

const pinia = createPinia();
pinia.use(({ store }) => { store.router = markRaw(router) });

app.use(pinia)
app.use(router)
app.use(VueAxios, axios)

if(localStorage.getItem('token')){
    (async () => {
        const auth = useAuth()
        try{
            auth.setIsAuth(true)
        }catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('token');
                auth.setIsAuth(false)
                await useRouter().push('/login')
            }else {
                auth.clear()
            }
        }
    })()
}
app.mount('#app')
