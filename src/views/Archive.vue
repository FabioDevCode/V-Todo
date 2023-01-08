<template>

    <SubTitle v-if="all_list_archive.length > 1" title="Listes archivées" />
    <SubTitle title="Liste archivée" />

    <div id="all_btns">
        <HomeBtn class="home_btn" />
        <ListBtn class="list_btn" />
    </div>

</template>
<!-- Template / Script -->
<script>
    import SubTitle from "@/components/SubTitle.vue"
    import HomeBtn from '@/components/HomeBtn.vue'
    import ListBtn from '@/components/ListBtn.vue'

	export default {
		name: 'Archive',
		components: {
            SubTitle,
            HomeBtn,
            ListBtn,
		},
		data() {
			return {
                all_list_archive: [],
			}
		},
        mounted() {
            const all_data = JSON.parse(localStorage.getItem('f-devcode_v-todo'));
            this.all_list_archive = all_data.list_archive;
        },
		methods: {

		}
	}
</script>
<!-- Script / Style -->
<style scoped>
    #all_btns {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin: 50px auto;
    }

</style>