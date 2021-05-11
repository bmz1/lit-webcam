import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { ref, createRef } from 'lit/directives/ref.js';

import { hasGetUserMedia, extractError } from './utils/helpers.js';
import { errorConstants } from './utils/constants.js';

import './icons/icon-camera-mute.js';
import './icons/icon-camera-on.js';
import './icons/icon-microphone-mute.js';
import './icons/icon-microphone-on.js';

export class LitWebcam extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-block;
      }

      .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
      }

      .wrapper video {
        width: 100%;
        display: block;
      }

      .video-muted:before {
        content: 'Video muted';
        color: white;
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      .loading:before {
        content: 'Loading camera...';
        color: white;
        position: absolute;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      }

      .controls {
        position: absolute;
        padding: 0 10px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        gap: 5px;
        bottom: 0;
        height: 50px;
        width: calc(100% - 20px);
        background-color: rgba(0, 0, 0, 0.8);
      }

      .controls > span {
        flex: 1;
        color: white;
        font-size: 16px;
      }
    `;
  }

  static get properties() {
    return {
      audio: { type: Boolean, attribute: 'audio', reflect: true },
      audioConstraints: { type: Object },
      videoConstraints: { type: Object },
      hasMedia: { type: Boolean, reflect: true },
      stream: { type: Object },
      videoEl: { type: Object, state: true },
      ownStream: { type: Boolean, attribute: 'own-stream' },
      loading: { type: Boolean, state: true },
      width: { type: Number, attribute: 'width' },
      height: { type: Number, attribute: 'height' },
      label: { type: String, attribute: 'label' },
      controls: { type: Boolean, attribute: 'controls' },
    };
  }

  constructor() {
    super();
    this.audio = false;
    this.stream = null;
    this.videoEl = createRef();
    this.hasMedia = false;
    this.loading = true;
    this.width = 640;
    this.height = 480;

    this.label = '';
  }

  async connectedCallback() {
    super.connectedCallback();
    if (!hasGetUserMedia()) {
      this.dispatch('onUserMediaError', {
        error: errorConstants.NOT_SUPPORTED,
      });
      return;
    }

    if (!this.hasMedia) {
      await this.requestUserMedia();
    }
  }

  async updated(changedProps) {
    super.updated();
    if (
      changedProps.has('videoContrainst') ||
      changedProps.has('audioConstraints') ||
      changedProps.has('audio')
    ) {
      await this.requestUserMedia();
    }

    if (changedProps.has('stream')) {
      if (this.stream) {
        setTimeout(() => {
          this.loading = false;
        }, 1500);
      }
    }
  }

  async requestUserMedia() {
    if (this.ownStream) {
      this.handleUserMedia(this.stream);
      return;
    }

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
      this.hasMedia = true;
    } catch (error) {
      this.hasMedia = true;
      this.src = window.URL.createObjectURL(stream);
    }
    this.dispatch('onUserMedia', stream);
  }

  handleError(err) {
    console.debug(err);
    this.hasMedia = false;
    this.dispatchEvent('onUserMediaError', extractError(err));

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
        detail: { payload },
        composed: true,
        bubbles: true,
      })
    );
  }

  get microphoneMuted() {
    if (this.stream) {
      if (this.stream.getAudioTracks()[0]) {
        return !this.stream.getAudioTracks()[0].enabled;
      }
    }
    return true;
  }

  get videoMuted() {
    if (this.stream) {
      if (this.stream.getVideoTracks()[0]) {
        return !this.stream.getVideoTracks()[0].enabled;
      }
    }
    return true;
  }

  toggleMicrophoneMute() {
    if (this.stream) {
      if (this.stream.getAudioTracks()[0]) {
        this.stream.getAudioTracks()[0].enabled =
          !this.stream.getAudioTracks()[0].enabled;
        this.dispatch('microphone-mute', {
          enabled: this.stream.getAudioTracks()[0].enabled,
        });
        console.log('muted');
        this.requestUpdate('microphoneMuted');
      } else {
        this.dispatch('request-microphone');
      }
    }
  }

  toggleVideoMute() {
    if (this.stream) {
      if (this.stream.getVideoTracks()[0]) {
        this.stream.getVideoTracks()[0].enabled =
          !this.stream.getVideoTracks()[0].enabled;
        this.dispatch('video-mute', {
          enabled: this.stream.getVideoTracks()[0].enabled,
        });
        this.requestUpdate('videoMuted');
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    LitWebcam.stopMediaStream(this.stream);
  }

  render() {
    return html`
      <div
        class="${classMap({
          wrapper: true,
          'video-muted': this.videoMuted,
          loading: this.loading,
        })}"
        style="${`width: ${this.width}px; height: ${this.height}px`}"
      >
        <video
          ${ref(this.videoEl)}
          autoplay
          src="${this.src}"
          muted
          playsinline
        ></video>
        ${this.controls
          ? html`<div class="controls">
              ${this.label ? html`<span>${this.label}</span>` : null}
              ${this.videoMuted
                ? html`<icon-camera-mute
                    @click="${this.toggleVideoMute}"
                  ></icon-camera-mute>`
                : html`<icon-camera-on
                    @click="${this.toggleVideoMute}"
                  ></icon-camera-on>`}
              ${this.microphoneMuted
                ? html`<icon-microphone-mute
                    @click="${this.toggleMicrophoneMute}"
                  ></icon-microphone-mute>`
                : html`<icon-microphone-on
                    @click="${this.toggleMicrophoneMute}"
                  ></icon-microphone-on>`}
            </div>`
          : null}
      </div>
    `;
  }
}
customElements.define('lit-webcam', LitWebcam);
