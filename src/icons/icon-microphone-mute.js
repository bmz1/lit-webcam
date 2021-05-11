import { LitElement, html, css } from 'lit';

class IconMicrophoneMute extends LitElement {
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
      <svg width="24" height="21" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20.5.8l.7.7L1.5 20.2l-.7-.7L20.5.8zm-3 7.7c.3 0 .5.2.5.5a7 7 0 01-5.8 6.9H12V19h2.5c.3 0 .5.2.5.5 0 .2-.2.5-.4.5H7.5a.5.5 0 01-.5-.5c0-.2.2-.5.4-.5H10v-3a7 7 0 01-1.4-.4l.8-.8 1.4.2h.2a6 6 0 006-6c0-.3.2-.5.5-.5zm-13 0c.3 0 .5.2.5.5a6 6 0 001 3.4l-.7.7A7 7 0 014 9c0-.3.2-.5.5-.5zm7.4 4l3-2.9a3.9 3.9 0 01-3 2.8zM11.1 0C13.3 0 15 1.7 15 3.9V4l-7.3 6.9c-.4-.7-.7-1.4-.7-2.3V4C7 1.7 8.7 0 10.9 0h.2z"
          fill="#FFF"
          fill-rule="evenodd"
        />
      </svg>
    `;
  }
}

customElements.define('icon-microphone-mute', IconMicrophoneMute);
