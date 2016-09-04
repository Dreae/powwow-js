import { InputBinding } from "./InputBinding";
import { Tag } from "./Tag";

declare var $: any;

export class BindText implements InputBinding {
	parent: HTMLElement;
	id: string;
	bindAttr: string;

	el: HTMLInputElement;
	tag: Tag;

	private cursorStart: number = 0;
	private cursorEnd: number = 0;

	constructor(id: string, attr: string, tag: Tag) {
		this.parent = tag.el;
		this.tag = tag;
		this.bindAttr = attr;
		this.id = id;

		if(tag[attr] == undefined) {
			tag[attr] = "";
		}
	}

	bind() {
		$(this.el).keyup(this.handleKeyUp());
	}

	handleKeyUp() {
		return () => {
			this.tag[this.bindAttr] = this.el.value;
			this.cursorStart = this.el.selectionStart;
			this.cursorEnd = this.el.selectionEnd;

			this.tag.update();
			this.focus();
		};
	}

	rebind() {
		this.el = $(this.parent).find(`#${this.id}`)[0];
		this.el.value = this.tag[this.bindAttr];
		this.bind();
	}

	focus() {
		this.el.focus();
		this.el.setSelectionRange(this.cursorStart, this.cursorEnd);
	}
}