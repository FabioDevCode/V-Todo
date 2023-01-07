<template>
	<h2>{{ title }}</h2>
</template>

<script>
    export default {
        name: 'SubTitle',
        props: {
            title: String,
        },
        data() {
			return {}
        }
    }
</script>

<style scoped>
    h2 {
		font-size: 2em;
		margin: 0 auto 20px auto;

	}
</style>