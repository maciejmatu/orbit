import { OrbitReviewAreaElement } from "./OrbitReviewAreaElement";

export class OrbitPromptElement extends HTMLElement {
  private mountPoint: HTMLElement | null = null;

  connectedCallback() {
    const reviewArea = this.getReviewAreaParent();
    if (!reviewArea) {
      throw new Error("Card without review area: " + this.outerHTML);
    }
    reviewArea.markNeedsRender();
  }

  attributeChangedCallback() {
    this.getReviewAreaParent()?.markNeedsRender();
  }

  private getReviewAreaParent(): OrbitReviewAreaElement | null {
    let currentElement: HTMLElement | null = this;
    do {
      currentElement = currentElement.parentElement;
    } while (
      currentElement !== null &&
      !(currentElement instanceof OrbitReviewAreaElement)
    );
    return currentElement;
  }

  static get observedAttributes() {
    return ["question", "answer"];
  }
}
