import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";


@customElement('hello-world')
export class HelloWorld extends LitElement {
	@property() name = ""

  render() {
    return html`
      <div>Hello from ${this.name}!</div>
    `;
  }
}
