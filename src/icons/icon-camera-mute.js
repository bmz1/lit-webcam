import { LitElement, html, css } from 'lit';

class IconCameraOff extends LitElement {
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
      <svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <path
            d="M16.875,4 C17.4963203,4 18,4.51167457 18,5.14285714 L18,8.859 L23.4930227,6.09049098 L23.944,7 L24,7 L24,18 L23.94,18 L24,18.0301637 L23.4930227,19.0523662 L18,16.283 L18,18.8571429 C18,19.4883254 17.4963203,20 16.875,20 L1.125,20 C0.503679656,20 0,19.4883254 0,18.8571429 L0,5.14285714 C0,4.51167457 0.503679656,4 1.125,4 L16.875,4 Z M17.0045371,5 L1.00453706,5 L1.00453706,19 L17.0045371,19 L17.0045371,5 Z M23,7.616 L18.4515021,9.90950902 L18,9 L18,16.142 L18.4515021,15.2333481 L23,17.526 L23,7.616 Z"
            id="Combined-Shape"
            fill="#FFFFFF"
            fill-rule="nonzero"
          ></path>
        </g>
      </svg>
    `;
  }
}

customElements.define('icon-camera-mute', IconCameraOff);
