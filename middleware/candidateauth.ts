import { useUserStore } from "../stores/user.store"

const userstore = useUserStore()


var is_authenticated = false
if (userstore.access_token !== null) {
    is_authenticated = true
}
export default defineNuxtRouteMiddleware((to, from) => {
    if(is_authenticated === false) {
        return navigateTo('/')
    }
})