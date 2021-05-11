import { LitElement, html, css } from 'lit';

class IconMicrophoneOn extends LitElement {
  static get styles() {
    return css`
    :host {
      cursor: pointer;
      padding: 0 5px;
    }
    `
  }

  render() {
    return html`
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18.5 10.5c.3 0 .5.2.5.5a7 7 0 01-6 7v3h2.5c.3 0 .5.2.5.5s-.2.5-.5.5h-7a.5.5 0 01-.5-.5c0-.3.2-.5.5-.5H11v-3a7 7 0 01-6-7c0-.3.2-.5.5-.5s.5.2.5.5a6 6 0 0012 0c0-.3.2-.5.5-.5zM12.1 2C14.3 2 16 3.7 16 5.9v4.7c0 2.2-1.7 3.9-3.9 3.9H12A3.9 3.9 0 018 10.6V6C8 3.7 9.7 2 11.9 2h.2z"
          fill="#FFF"
          fill-rule="evenodd"
        />
      </svg>
    `;
  }
}

customElements.define('icon-microphone-on', IconMicrophoneOn);
