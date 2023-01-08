// import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useListStore = defineStore('list', {
	state() {
		return {
			list: "",
			length: 0,
			todo: [],
            ended: []
		}
	},
})
