<template>
	<section id="main">
        <div class="container">
        	<h1>Webpack mess: {{ message }}</h1>
        	
        </div>
    </section>
</template>

<script>
export default {
	data() {
		return {
			message: null
		}
	},
	created() {
		this.message = this.$store.getters.getMessage
	}
}
</script>

<style lang="scss" scoped>
h1{
	color: red;
}
</style>
