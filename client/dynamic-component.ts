import Vue from "vue";
import Component from "vue-class-component";

@Component({
	template: "<h4>Better</h4>"
})
export default class DynamicComponent extends Vue
{
	onClick() : void
	{
		console.log("Clicked!");
	}
}