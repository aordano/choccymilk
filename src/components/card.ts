import { html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseElement } from "./base";

@customElement("choccy-card")
export class Card extends BaseElement {
    @property({ type: String }) title = "";
    @property({ type: String }) image = "";

    render() {
        return html`
            <div
                class="card hover max-w-96 bg-neutral text-neutral-content shadow-sm"
            >
                ${this.image
                    ? html`<figure class="w-100 max-h-64">
                          <img src="${this.image}" alt="${this.title}" />
                      </figure>`
                    : null}
                <div class="card-body">
                    <h2 class="card-title font-normal">${this.title}</h2>
                    <slot></slot>
                    <div class="card-actions justify-end">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "choccy-card": Card;
    }
}
