import Vue from "vue";
import Component from "vue-class-component";

@Component({
	template: "<h3>Welcome!</h3>"
})
export default class AppContent extends Vue
{
	public static register() : void
	{
		Vue.component("app-content", AppContent);
	}
}