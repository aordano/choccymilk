import { html, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BaseElement } from "./base";

@customElement("choccy-blog-card")
export class BlogCard extends BaseElement {
    @property() title: string = "No Provided Title";
    @property() image: string = "";
    @property() tags: string = "";
    @property() date: string = "Who Knows";
    @property() palette: string = "neutral";
    @property() side: string = "left";
    @property() description: string = "No Provided Description";
    @property() target: string = "";

    @state() mobile = window.matchMedia("(max-device-width: 1024px)").matches;

    render() {
        const tags = this.tags.split(",").map((name) => {
            return html`<a
                href="/tags/${name}"
                class="mx-1 link-hover capitalize"
                >${name}</a
            >`;
        });

        const left = this.side === "left";

        const justify = left ? "start" : "end";

        const textAlign = left
            ? "text-start ms-0 me-auto"
            : "text-end me-0 ms-auto";

        const buttonAlign = left ? "sm:pe-12 sm:ps-4" : "sm:ps-12 sm:pe-4";

        const bodyPadding = left ? "ps" : "pe";

        const figure = html`<figure
            class="sm:max-h-96 lg:max-w-80 lg:px-8 xl:max-w-[500px] xl:py-10"
        >
            <img
                class="lg:rounded-xl xl:rounded-md"
                src="${this.image}"
                alt="${this.title}"
            />
        </figure>`;

        return html`
            <div
                class="card lg:card-side bg-${this.palette} text-${this
                    .palette}-content shadow-xl w-100"
            >
                ${this.image && (left || this.mobile) ? figure : null}
                <div class="card-body pt-0 lg:${bodyPadding}-0">
                    <div
                        class="my-4 me-0 pb-0 pt-4 card-actions justify-between"
                    >
                        <div class="opacity-75 text-sm">
                            ${left ? this.date : tags}
                        </div>
                        <div class="opacity-75 text-sm">
                            ${left ? tags : this.date}
                        </div>
                    </div>
                    <h2
                        class="justify-${justify} card-title mt-2 mb-6 font-normal text-${this
                            .palette}-content"
                    >
                        ${this.title}
                    </h2>
                    <p
                        class="${textAlign} prose font-light text-${this
                            .palette}-content"
                    >
                        ${this.description}
                    </p>
                    <div class="card-actions sm:justify-${justify} mt-4">
                        <a
                            href="${this.target}"
                            class="btn btn-${left
                                ? "primary"
                                : "neutral"} font-normal sm:btn-sm mx-auto sm:mx-0 px-10 ${buttonAlign}"
                        >
                            Read
                        </a>
                    </div>
                </div>
                ${this.image && !this.mobile && !left ? figure : null}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "choccy-blog-card": BlogCard;
    }
}
