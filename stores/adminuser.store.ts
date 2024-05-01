import { defineStore } from 'pinia';

export const useAdminUserStore = defineStore('useAdminStore', {
    state: () => ({
        display_name: null as String|null,
        access_token: null as String|null,
        result_details: {}
    }),
    persist: true,
    actions: {
        setAdminUserSession(access_token:String, display_name:String) {
            this.display_name = display_name
            this.access_token = access_token
        },
        setResultDetails(result_details:{}) {
            this.result_details = result_details
        },
        removeAdminUserSession() {
            this.display_name = null
            this.access_token = null
            this.result_details = {}
        }
    }
}) 