<template>
	<header>
		<h1>Vue & Pinia Todolist</h1>
	</header>

	<div id="btn_sections">
		<Button class="btns" name="Créer une liste" type="btn_green" />
		<Button class="btns" name="Listes en cours" type="btn_blue" />
		<Button class="btns" name="Archives" type="btn_red" />
	</div>

	<footer>
		<p>Made with love by Fabio R. LOPES</p>
	</footer>
</template>

<!-- Template / Script -->
<script>
	import Button from '@/components/Button.vue'
	export default {
		name: 'Home',
		components: {
			Button
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
	header {
		display: flex;
		margin-bottom: 100px;
	}
	header h1 {
		margin: 50px auto;
	}

	#btn_sections {
		display: flex;
		flex-direction: column;
		margin-bottom: 150px;
	}
	#btn_sections .btns {
		margin-bottom: 20px;
		box-shadow: 0 0 16px rgba(25, 29, 46, .3);
		/* box-shadow: 0 0 16px red; */

	}

	footer {
		display: flex;
		justify-content: center;
		margin-bottom: 50px;
	}
</style>