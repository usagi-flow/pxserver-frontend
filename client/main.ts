import "./styles.scss";

//import AngularStarter from "./angular-starter";

//AngularStarter.get().start();

import Vue from "vue";
import DynamicComponent from "./dynamic-component";
//import VueComponent from "./vue-component";

Vue.component("dynamic", Vue.extend({
	template: "<h4>Dynamic</h4>"
}));
Vue.component("dynamic", DynamicComponent);

let app : Vue = new Vue({
	el: "#root",
	data: {
		message: "Hello from Vue on " + new Date().toLocaleDateString()
	}
});