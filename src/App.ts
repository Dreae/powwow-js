import { Tag } from "./Tag";

declare var $: any;

export class App {
	bind(tag: { new(el: HTMLElement): Tag; tagName: string; }) {
		$(tag.tagName).map((idx, el) => {
			var tagInstance = new tag(el);
			tagInstance.render();
			tagInstance.bindInputs();
		});
	}
}

