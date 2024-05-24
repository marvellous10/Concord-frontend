import { useAdminUserStore } from "../stores/adminuser.store"
import { useSelected } from '../stores/selected.store'
import { useUserStore } from '../stores/user.store'
import { useAdminVoteSession } from "../stores/adminvotesession.store"
import { useOverviewStore } from "../stores/overview.store"

const adminuserstore = useAdminUserStore()
const overviewstore = useOverviewStore()
const adminvotesession = useAdminVoteSession()

const userselected = useSelected()
const userstore = useUserStore()

var is_authenticated = false

userstore.endUserSession()
userselected.removeSelections()

if (adminuserstore.access_token !== null) {
    is_authenticated = true
}
export default defineNuxtRouteMiddleware((to, from) => {
    if(is_authenticated === false) {
        return navigateTo('/admin')
    }
})