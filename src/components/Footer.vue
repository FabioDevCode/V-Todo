<template>
    <footer>
		<p>Made with love by <b>Fabio R. LOPES</b></p>
	</footer>
</template>

<script>
    export default {
        name: 'Footer',
        data() {
        }
    }
</script>

<style scoped>
    footer {
		display: flex;
		justify-content: center;
		margin-bottom: 50px;
	}
	footer p {
		color: rgba(250, 250, 250, .6);
	}
</style>