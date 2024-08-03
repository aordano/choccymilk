import { html, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { BaseElement } from "./base";

@customElement("choccy-blog-card")
export class BlogCard extends BaseElement {
    @property() title: string = "";
    @property() image: string = "";
    @property() tags: string = "";
    @property() date: string = "";
    render() {
        return html`
            <div
                class="card lg:card-side bg-neutral text-neutral-content shadow-xl w-100"
            >
                ${this.image
                    ? html`<figure>
                          <img src="${this.image}" alt="${this.title}" />
                      </figure>`
                    : null}
                <div class="card-body pt-0">
                    <div
                        class="mt-4 me-0 mb-2 pb-0 card-actions justify-between"
                    >
                        <div class="opacity-75 text-sm">${this.date}</div>
                        <div class="opacity-75 text-sm">
                            ${this.tags.split(",").map((name) => {
                                return html`<a
                                    href="/tags/${name}"
                                    class="mx-1 capitalize"
                                    >${name}</a
                                >`;
                            })}
                        </div>
                    </div>
                    <h2 class="card-title mb-2">${this.title}</h2>
                    <slot></slot>
                    <div class="card-actions justify-end mt-4">
                        <slot name="actions"></slot>
                    </div>
                </div>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "choccy-blog-card": BlogCard;
    }
}
