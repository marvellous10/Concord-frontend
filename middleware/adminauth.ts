import { useAdminUserStore } from "../stores/adminuser.store"

const adminuserstore = useAdminUserStore()
var is_authenticated = false
if (adminuserstore.access_token !== null) {
    is_authenticated = true
}
export default defineNuxtRouteMiddleware((to, from) => {
    if(is_authenticated === false) {
        return navigateTo('/admin')
    }
})