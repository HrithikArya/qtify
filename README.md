# QTify

QTify is a React music discovery web app with albums, songs, genre filters, FAQs, search suggestions, and an interactive player experience.

## Features

- Browse `Top Albums` and `New Albums`
- Browse `Songs` by genre using tabs
- Songs carousel with clickable cards
- Functional song player:
  - play/pause
  - seek with timeline slider
  - elapsed and total duration display
- FAQ section with accordions (fetched from API)
- Feedback modal opened via `Give Feedback` button
  - blocks background with dark overlay
  - includes form fields: `name`, `email`, `subject`, `description`
- Search dropdown with live suggestions from albums and songs
- Branded page title and favicon (`QTify` + app logo)

## Tech Stack

- React (Create React App)
- Material UI (`@mui/material`, `@mui/icons-material`)
- Axios
- Swiper

## API Endpoints Used

- `https://qtify-backend.labs.crio.do/albums/top`
- `https://qtify-backend.labs.crio.do/albums/new`
- `https://qtify-backend.labs.crio.do/songs`
- `https://qtify-backend.labs.crio.do/genres`
- `https://qtify-backend.labs.crio.do/faq`

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

## Scripts

- `npm start`: Run app in development mode
- `npm test`: Run tests
- `npm run build`: Production build (configured in `package.json`)

Note: On Windows shells, if `npm run build` fails because of `CI=false`, use:

```bash
npx react-scripts build
```

## Project Structure (Key Files)

- `src/App.js`
- `src/components/Section/Section.jsx`
- `src/components/Search/Search.jsx`
- `src/components/FeedbackModal/FeedbackModal.jsx`
- `src/components/Navbar/Navbar.jsx`

## Current Notes

- The songs API does not provide direct audio URLs, so demo MP3 sources are mapped internally to enable real playback behavior in the player UI.
