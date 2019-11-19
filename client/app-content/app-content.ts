import Vue from "vue";
import Component from "vue-class-component";

@Component({
	template: "<h3>Welcome!</h3>" +
		"<p>If you are seeing this, the pxserver-frontend library started up correctly, " +
		"but no solution files have been loaded.</p>"
})
export default class AppContent extends Vue
{
	public static register() : void
	{
		Vue.component("AppContent", AppContent);
	}
}