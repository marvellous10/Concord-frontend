import { defineStore } from 'pinia';

export const useSelected = defineStore('selected', {
    state: () => ({
        page_list: [] as [],
        page_index: 0 as number,
        selected: [] as []
    }),
    persist: true,
    actions: {
        addPagelist(page_list:String) {
            this.page_list.push(page_list)
        },
        addIndex(){
            this.page_index++
        },
        reduceIndex() {
            this.page_index--
        },
        returnToZero() {
            this.page_index = 0
        },
        addSelection(candidate_id:String) {
            this.selected.push(candidate_id)
        },
        addSelectionWithIndex(candidate_id:String, index_number:number) {
            this.selected[index_number] = candidate_id
        },
        removeSelections() {
            this.selected = []
            this.page_list = []
            this.selected = []
            this.page_index = 0
        }
    }
})