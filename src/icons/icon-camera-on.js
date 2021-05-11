import { LitElement, html, css } from 'lit';

class IconCameraShare extends LitElement {
  static get styles() {
    return css`
    :host {
      cursor: pointer;
      padding: 0 5px;
    }
    `
  }
  // eslint-disable-next-line class-methods-use-this
  render() {
    return html`
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path
            d="M22.75,6.94677312 C22.59,6.86294079 22.4,6.86294079 22.25,6.95608782 L18,9.32202262 L18,5.49367931 C18,5.2328676 17.78,5.02794411 17.51,5.02794411 L2.51,5 L2.5,5 C2.37,5 2.25,5.04657352 2.15,5.13972056 C2.06,5.22262142 2,5.34464405 2,5.4657352 L2,18.5342648 C2,18.7857618 2.23,19 2.5,19 L17.5,19 C17.78,19 18,18.7857618 18,18.5342648 L18,15.6271457 L22.25,18.0033267 C22.4,18.087159 22.59,18.087159 22.75,18.0033267 C22.91,17.9194943 23,17.7704591 23,17.6027944 L23,7.35662009 C23,7.18895542 22.91,7.03060546 22.75,6.94677312"
            fill-rule="evenodd"
            fill="#FFF"
          ></path>
        </g>
      </svg>
    `;
  }
}

customElements.define('icon-camera-on', IconCameraShare);
