import './js/'

import './assets/css/main.css'
import './assets/scss/main.scss'


//import 'vue'
//import Vue from 'vue'
window.Vue = require('vue')
import store from './store'

Vue.component('example-component', require('./components/Example.vue').default)

const app = new Vue({
	data() {
		return {
			showExampleComponent: false
		}
	},
	store,
	el: '#app'
})