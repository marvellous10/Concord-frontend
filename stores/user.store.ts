import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        access_token: '' as String | null,
        display_name: '' as String | null,
    }),
    persist: true,
    actions: {
        setUserSession(access_token:String, display_name:String) {
            this.access_token = access_token
            this.display_name = display_name
        },
        endUserSession() {
            this.access_token = null
            this.display_name = null
        }
    }
})