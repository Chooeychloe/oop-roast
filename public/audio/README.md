# ElevenLabs voice tracks

Download or export one MP3 for every row in `manifest.csv`. Use the row's `elevenlabs_text` as the script and save the audio using its exact `filename` in this folder. Regenerate the manifest after changing roast text with `npm run audio:manifest`.

The quiz uses one roast style: savage. The manifest only lists tracks used by that style.

Examples:

- `savage-bad-01.mp3`
- `savage-timeout-03.mp3`
- `streak-good-02.mp3`
- `ending-80-02.mp3`
- `welcome.mp3`
- `round-start.mp3`

The app plays a matching MP3 when it exists. If a track is missing or cannot play, it falls back to the browser/device speech voice. Turn Voice off to mute both.

The current streak count stays visible in the quiz HUD. Streak roast scripts are fixed phrases, so each one has an exact matching MP3 script without placeholders.

After adding tracks, run the production build and deploy the `dist/` folder as usual. Files in `public/audio/` are copied into the production output.
