# Kalabaw OOP Roast Review

A browser-based Java OOP quiz built with React and Vite. It is a static web app: no database or backend is required.

## Run locally

```sh
npm install
npm run dev
```

## Build and deploy

```sh
npm run build
```

The production site is written to `dist/`. On a static host, set the build command to `npm run build` and the publish/output directory to `dist`. You can also upload the contents of `dist/` to a static file host. Vite is configured to use relative asset paths, so the app can be served from a project subpath as well as a root domain.

## Browser notes

- Questions, custom questions, settings, and scores are stored in that browser's local storage. They do not sync between browsers or devices.
- Voice uses the browser's Web Speech API and voices installed or exposed by the user's device. Voice availability and sound vary by browser and operating system. If speech synthesis is unavailable, the quiz text still works.
- The display font is loaded from Google Fonts; system fonts are used if that request is unavailable.
