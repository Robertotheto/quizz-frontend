import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

export const useAuth = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token'));
    const user = ref(JSON.parse(localStorage.getItem('user')));
    const isAuth = ref(false);

    function setToken(tokenValue) {
        localStorage.setItem('token', tokenValue);
        token.value = tokenValue;
    }

    function setUser(userValue) {
        localStorage.setItem('user', JSON.stringify(userValue));
        user.value = userValue;
    }
    function setIsAuth(auth) {
        isAuth.value = auth;
    }
    const isAuthenticated = computed(() => !!token.value && !!user.value);


    function clear () {
        token.value = null;
        user.value = null;
        isAuth.value = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    return {
        token,
        user,
        isAuthenticated,
        setToken,
        setUser,
        isAuth,
        setIsAuth,
        clear,
    };
});