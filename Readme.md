## In progress


## Development

`yarn dev`
## Usage

``` 
<lit-webcam
     ?audio="${this.audio}"
     audioConstraints="${{ deviceId: '...' }}"
     videoContraints="${{
       width: 640,
       height: 480,
       facingMode: 'user',
       deviceId: '...',
      }}"
     controls
     width="${640}"
     height="${480}"
     label="John Doe"
     @microphone-mute="${this.onMicrophoneMute}"
     @video-mute="${this.onVideoMute}"
     @request-microphone="${this.onRequestMicrophone}"
     @onUserMedia="${({
        event: {
          detail: { payload: stream },
         }}) => {}}"
     @onUserMediaError="${({
        event: {
          detail: { payload: error },
          }}) => {}}"
></lit-webcam>
```
