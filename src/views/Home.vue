<template>
	<Header />

	<div id="btn_sections">
		<FormList />

		<Button class="btns" name="Listes en cours" type="btn_blue" />
		<Button class="btns" name="Archives" type="btn_red" />
	</div>

	<Footer />
</template>

<!-- Template / Script -->
<script>
	import Button from '@/components/Button.vue'
	import FormList from '@/components/FormList.vue'
	import Header from '@/components/Header.vue'
	import Footer from '@/components/Footer.vue'

	export default {
		name: 'Home',
		components: {
			Button,
			FormList,
			Header,
			Footer
		},
		data() {
			return {
				current_list: null,
				task: {}
			}
		},
		mounted() {


		},
		methods: {


		}
	}
</script>

<!-- Script / Style -->

<style>
	#btn_sections {
		display: flex;
		flex-direction: column;
		margin-bottom: 150px;
	}
	#btn_sections .btns {
		margin-bottom: 16px;
		box-shadow: 0 0 16px rgba(25, 29, 46, .3);
	}
</style>