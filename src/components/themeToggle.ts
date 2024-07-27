import { html, css, PropertyValues } from "lit";
import { property, state, customElement } from "lit/decorators.js";
import { BaseElement } from "./base";

@customElement("choccy-themetoggle")
class ThemeToggle extends BaseElement {
    @property({ type: String }) light = "light";
    @property({ type: String }) dark = "dark";

    @state() private isDarkTheme = false;
    @state() private storedTheme: string | null = "";

    static styles = [
        css`
            :host {
                display: inline-block;
                cursor: pointer;
            }
            .icon {
                transition: color 400ms, transform 400ms;
            }
            .icon-light {
                color: var(--light-icon-color, #000);
            }
            .icon-dark {
                color: var(--dark-icon-color, #fff);
            }
            .icon-enter {
                transform: rotate(0deg);
            }
            .icon-exit {
                transform: rotate(360deg);
            }
        `,
        ...super.styles,
    ];

    constructor() {
        super();
        this.storedTheme = localStorage.getItem("theme");
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if (this.storedTheme) {
            this.isDarkTheme = this.storedTheme === this.dark;
            document.documentElement.setAttribute(
                "data-theme",
                this.storedTheme
            );
        } else {
            this.isDarkTheme =
                document.documentElement.getAttribute("data-theme") ===
                this.dark;
        }
    }

    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        const newTheme = this.isDarkTheme ? this.dark : this.light;
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
    }

    render() {
        return html`
            <div class="btn btn-ghost btn-sm" @click="${this.toggleTheme}">
                <i
                    class="icon ${this.isDarkTheme
                        ? "fa fa-sun icon-dark icon-enter"
                        : "fa fa-moon icon-light icon-exit"}"
                ></i>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "choccy-themetoggle": ThemeToggle;
    }
}
