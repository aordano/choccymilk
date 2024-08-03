import { html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BaseElement } from "./base";
import copy from "copy-to-clipboard";

@customElement("choccy-copy-text")
export class CopiableText extends BaseElement {
    @property({ type: String }) icon = "fa-copy";
    @property({ type: String }) target = "";
    @property({ type: String }) toast = "Copied";
    @property({ type: String }) timeout = 2000;

    @state() private showToast = false;

    copy() {
        copy(this.target, {
            format: "text/plain",
            onCopy: () => this.showCopiedMessage(),
        });
    }

    showCopiedMessage() {
        this.showToast = true;
        setTimeout(() => {
            this.showToast = false;
        }, this.timeout); // Hide the toast after 1 second
    }

    render() {
        return html`
            <a class="link link-hover" @click="${this.copy}">
                <slot></slot> <i class="fa-solid ${this.icon}"></i>
            </a>
            ${this.showToast
                ? html`
                      <div class="toast toast-top toast-end opacity-100">
                          <div class="alert">
                              <span>${this.toast}</span>
                          </div>
                      </div>
                  `
                : null}
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "choccy-copy-text": CopiableText;
    }
}
