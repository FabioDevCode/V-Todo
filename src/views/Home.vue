<template>
	<div id="btn_sections">
		<FormList />


		<div id="all_btns">
			<ListBtn />
			<ArchiveBtn />
		</div>
		<!-- <Button class="btns" name="Listes en cours" type="btn_blue" @click="goToListEnCours()" />
		<Button class="btns" name="Archives" type="btn_red" @click="goToArchive()" /> -->
	</div>
</template>

<!-- Template / Script -->
<script>
	import Button from '@/components/Button.vue'
	import FormList from '@/components/FormList.vue'
    import ListBtn from '@/components/ListBtn.vue'
    import ArchiveBtn from '@/components/ArchiveBtn.vue'

	export default {
		name: 'Home',
		components: {
			Button,
			FormList,
			ListBtn,
			ArchiveBtn,
		},
		data() {
			return {
			}
		},
		methods: {
			goToListEnCours() {
				this.$router.push('/V-Todo/En_cours');
			},
			goToArchive() {
				this.$router.push('/V-Todo/Archive');
			}
		}
	}
</script>

<!-- Script / Style -->

<style scoped>
	#btn_sections {
		display: flex;
		flex-direction: column;
		margin-bottom: 100px;
	}
	#btn_sections .btns {
		margin-bottom: 16px;
		box-shadow: 0 0 16px rgba(25, 29, 46, .3);
	}
	#all_btns {
        display: flex;
        justify-content: space-evenly;
        width: 100%;
        min-width: 200px;
        max-width: 300px;
        margin: 50px auto 0 auto;
    }
</style>