<template>
    <header>
		<h1>V-Todo</h1>
	</header>
</template>

<script>
    export default {
        name: 'Header',
        data() {
			return {}
        }
    }
</script>

<style scoped>
    header {
		display: flex;
		margin-bottom: 100px;
	}
	header h1 {
		font-size: 3.6em;
		margin: 50px auto;
		font-family: 'Atomic Age', sans-serif;
	}
</style>