import { LitElement, unsafeCSS } from "lit";
import globalStyles from "../index.css?inline";

export class BaseElement extends LitElement {
    static styles = [unsafeCSS(globalStyles)];
}
