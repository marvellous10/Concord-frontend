import { defineStore } from "pinia";

export const useAdminVoteSession = defineStore('adminVoteSession', {
    state: () => ({
        session_name: null as String|null,
        vote_session: {},
        vote_positions: [{}]
    }),
    persist: true,
    actions: {
        setPartialVoteSession(session_name:String, voting_positions_data:[{}]) {
            this.session_name = session_name
            this.vote_positions = voting_positions_data
        },
        setVoteSession(voting_session_data:{}) {
            this.vote_session = voting_session_data
        },
        removeVoteSession() {
            this.vote_session = {}
            this.session_name = null
            this.vote_positions = [{}]
        }
    }
})