import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        access_token: null as String | null,
        display_name: null as String | null,
        voting_details: {},
        //referral_number: null as String|null,
    }),
    persist: true,
    actions: {
        setUserSession(voting_details:{}, access_token:String, display_name:String) {
            this.voting_details = voting_details
            this.access_token = access_token
            this.display_name = display_name
            //this.referral_number = referral_number
        },
        endUserSession() {
            this.access_token = null
            this.display_name = null
            this.voting_details = {}
            //this.referral_number = null
        }
    }
})