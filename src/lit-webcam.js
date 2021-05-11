import { LitElement, html, css } from 'lit';
import { ref, createRef } from 'lit/directives/ref.js';

import { hasGetUserMedia, extractError } from './utils/helpers.js';
import { errorConstants } from './utils/constants.js';

export class LitWebcam extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }
    `;
  }

  static get properties() {
    return {
      audio: { type: Boolean, attribute: 'audio', reflect: true },
      audioConstraints: { type: Object },
      videoConstraints: { type: Object },
      stream: { type: Object, state: true },
      videoEl: { type: Object, state: true },
    };
  }

  constructor() {
    super();
    this.audio = false;
    this.mirrored = false;

    this.stream = null;
    this.videoEl = createRef();

    this.hasMedia = false;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!hasGetUserMedia()) {
      this.dispatch(errorConstants.NOT_SUPPORTED);
      return;
    }

    if (!this.hasMedia) {
      await this.requestUserMedia();
    }
  }

  async requestUserMedia() {
    const constraints = {
      video:
        typeof this.videoConstraints !== 'undefined'
          ? this.videoConstraints
          : true,
    };

    if (this.audio) {
      constraints.audio =
        typeof this.audioConstraints !== 'undefined'
          ? this.audioConstraints
          : true;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.handleUserMedia(stream);
    } catch (err) {
      this.handleError(err);
    }
  }

  handleUserMedia(stream) {
    this.stream = stream;

    try {
      if (this.videoEl?.value) {
        const videoEl = this.videoEl.value;
        videoEl.srcObject = stream;
      }
      this.hasUserMedia = true;
    } catch (error) {
      this.hasUserMedia = true;
      this.src = window.URL.createObjectURL(stream);
    }
    this.dispatch('onUserMedia', stream);
  }

  handleError(err) {
    this.hasUserMedia = false;
    this.dispatchEvent('onUserMediaError', { error: extractError(err) });

    return;
  }

  static stopMediaStream(stream) {
    if (stream) {
      if (stream.getVideoTracks && stream.getAudioTracks) {
        stream.getVideoTracks().map((track) => track.stop());
        stream.getAudioTracks().map((track) => track.stop());
      } else {
        stream.stop();
      }
    }
  }

  dispatch(eventName, payload = {}) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: payload,
        composed: true,
        bubbles: true,
      })
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    LitWebcam.stopMediaStream(this.stream);
  }

  render() {
    return html`
      <video
        ${ref(this.videoEl)}
        autoplay
        src="${this.src}"
        ?muted="${!this.audio}"
        playsinline
      ></video>
    `;
  }
}
customElements.define('lit-webcam', LitWebcam);
