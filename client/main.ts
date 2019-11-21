import "./styles.scss";

import Vue from "vue";

import AppContent from "./app-content/app-content";
import VueComponent from "./vue-component.vue";

AppContent.register();
Vue.component("VueComponent", VueComponent);

let app : Vue = new Vue({
	el: "#app",
	data: {
		message: "Hello from Vue on " + new Date().toLocaleDateString()
	}
});