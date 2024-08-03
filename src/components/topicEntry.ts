import { html, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { BaseElement } from "./base";
import topicMap from "../assets/topicMap.json";

const topics = topicMap as unknown as Record<string, Topic>;

interface TopicIcon {
    set: string;
    icon: string;
}

interface Topic {
    icon: TopicIcon;
    text: string;
}

@customElement("choccy-topic-entry")
export class TopicEntry extends BaseElement {
    @property() topic: string | false = false;

    @state() private icon = html`<i class="fa-solid fa-circle-question"></i>`;
    @state() private tooltip = "Unkown Topic";

    render() {
        return html`
            <div class="tooltip" data-tip="${this.tooltip}">
                <span class="text-xs opacity-75 capitalize">${this.icon}</span>
            </div>
        `;
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        if (this.topic && topics[this.topic]) {
            const thisTopic = topics[this.topic];

            this.tooltip = thisTopic.text;
            this.icon = html`<i
                class="fa-${thisTopic.icon.set} fa-${thisTopic.icon.icon}"
            ></i>`;
        }
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "choccy-topic-entry": TopicEntry;
    }
}
