import { InputBinding } from "./InputBinding";
import { BindText } from "./BindText";

declare var $: any;

export abstract class Tag {
  template: any;
  [index: string]: any;
  el: HTMLElement;

  private inputs: InputBinding[];
  
  constructor(el: HTMLElement) {
    this.el = el;
    this.inputs = [];
  }

  render() {
    this.el.innerHTML = this.template(this);
  }

  update() {
    this.render();

    this.rebindInputs();
  }

  rebindInputs() {
    this.inputs.map((input) => {
      input.rebind();
    });
  }

  bindInputs() {
    $(this.el).find("[data-bind]").map((idx: number, input: HTMLElement) => {
      if(input.tagName.toLowerCase() == "input" && input.getAttribute("type") == "text") {
        let binding = new BindText(input.getAttribute("id"), input.getAttribute("data-bind"), this);
        binding.rebind();

        this.inputs.push(binding);
      }
    });
  }
}