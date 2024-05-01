import { defineStore } from 'pinia'

export const useOverviewStore = defineStore('overviewStore', {
    state: () => ({
        session_name: null as String|null,
        voting_code: null as String|null,
        position_count: null as String|null,
        voters_count: null as String|null,
        positions: null as []|null,
        position_winners: null as []|null
    }),
    persist: true,
    actions: {
        saveOverviewData(session_name:String, voting_code:String, position_count:String, voters_count:String, positions:[], position_winners:[]) {
            this.session_name = session_name
            this.voting_code = voting_code
            this.position_count = position_count
            this.voters_count = voters_count
            this.positions = positions
            this.position_winners = position_winners
        },
        removeOverviewData() {
            this.session_name = null
            this.voting_code = null
            this.position_count=null
            this.voters_count = null
            this.positions = null
            this.position_winners = null
        }
    }
})