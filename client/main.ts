import "./styles.scss";

import Vue from "vue";

import AppContent from "./app-content/app-content";

AppContent.register();

let app : Vue = new Vue({
	el: "#app",
	data: {
		message: "Hello from Vue on " + new Date().toLocaleDateString()
	}
});