# HaditsSoft (A.K.A. GetHadith) — 14 Books of Hadith

A comprehensive web application for browsing, searching, and studying Islamic hadith collections from 14 major hadith books.

**[Live Demo](https://haditssoft.github.io)**

<!-- Replace the file below with your own screenshot -->
![Frontend Screenshot](screenshot.png)

---

## Features

### General Features

- **14 Hadith Collections** — Browse the complete text of 14 major hadith books, from the six canonical collections (Kutub al-Sittah) to additional major works.
- **Full-Text Search** — Search across all 14 books or within specific books. Supports single and multi-keyword modes with selectable book filters.
- **Narrator Search (Rawi)** — Search for hadith narrators by name, kunyah (honorific), generation/classification, and reliability level.
- **Hadith Grading** — View the quality-based classification (kedudukan) of each hadith, from authentic to weak.
- **Thematic Browsing** — Browse hadith by thematic categories (tema) across all collections.
- **Sanad Visualization** — View and explore the chain of narration (sanad) for each hadith, including interactive diagram rendering.
- **Similar Hadith Discovery** — Find parallel and comparable narrations across different hadith collections.

### Signed-In User Features

- **AI Summary** — Automatically generated structured summary of each hadith, including key points, explanation, and lessons.
- **Personal Notes** — Create, view, and manage personal notes on individual hadith. Notes are organized and viewable across all books.
- **Font Settings** — Customize Arabic and UI font sizes for comfortable reading.
- **Auto-Save Last Read** — Your last reading position is automatically saved and restored when you return.
- **Bookmark Management** — Organize hadith into custom-titled bookmark collections with full CRUD support.

---

## 14 Hadith Collections

| #  | Collection                  |
|----|-----------------------------|
| 1  | Shahih Bukhari              |
| 2  | Shahih Muslim               |
| 3  | Sunan Tirmidzi              |
| 4  | Sunan Abu Daud              |
| 5  | Sunan Nasa'i                |
| 6  | Sunan Ibnu Majah            |
| 7  | Sunan Darimi                |
| 8  | Musnad Ahmad                |
| 9  | Muwatha Malik               |
| 10 | Sunan Daruquthni            |
| 11 | Shahih Ibnu Khuzaimah       |
| 12 | Shahih Ibnu Hibban          |
| 13 | Al-Mustadrak                |
| 14 | Musnad Syafi'i              |

---

## Built With

| Technology | Purpose |
|------------|---------|
| [React](https://reactjs.org/) 16.9 | UI framework (class components) |
| [Redux](https://redux.js.org/) | State management |
| [React Router](https://reactrouter.com/) v5 | Client-side routing |
| [Material-UI](https://material-ui.com/) v4 | UI component library |
| [React Google reCAPTCHA](https://www.npmjs.com/package/react-google-recaptcha) | Bot protection |

---

## Prerequisites

- **Node.js v10.24.1** — Required for `npm install`. It is recommended to use [NVM for Windows](https://github.com/coreybutler/nvm-windows) to manage multiple Node versions.
- **Google reCAPTCHA** — Register your domain or public IP address at the [reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin) and obtain a site key.

---

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/haditssoft/haditssoft.git
   cd haditssoft
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create or edit the `.env` file in the project root:

   ```env
   REACT_APP_DOMAIN_PREFIX_PROD="api."
   REACT_APP_HOSTNAME_PROD="your-api-domain.com"
   REACT_APP_DOMAIN_PREFIX_DEV=""
   REACT_APP_IP_SUFFIX_PROD=":9090"
   REACT_APP_IP_SUFFIX_DEV=":8081"
   REACT_APP_RECAPTCHA_KEY="your-recaptcha-site-key"
   ```

4. **Start the development server**

   ```bash
   npm start
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Runs the app in development mode |
| `npm run build` | Builds the app for production to the `build/` folder |
| `npm test` | Launches the test runner |
| `npm run eject` | Ejects the CRA configuration (one-way operation) |

---

## License

This project is licensed under the [MIT License](LICENSE).
