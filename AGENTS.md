# GetHadith — Frontend Codebase Walkthrough

## Overview

**GetHadith** is a React-based web application for browsing, searching, and studying Islamic hadith collections. It is deployed to **Firebase Hosting** and communicates with a backend API.

| Attribute | Detail |
|---|---|
| **Framework** | Create React App (react-scripts 3.1.1) |
| **React version** | 16.9.0 (class components) |
| **UI library** | Material-UI v4 (`@material-ui/core` 4.4.2) |
| **State management** | Redux (`redux` 4.0.1 + `react-redux` 7.1.0) |
| **Routing** | `react-router-dom` v5 |
| **Hosting** | Firebase Hosting |
| **Auth / reCAPTCHA** | `react-google-recaptcha` 2.0.1 |
| **Node requirement** | v10.24.1 for `npm install`; latest for Firebase CLI |

---

## Project Structure

```
d:\Sugeng\gethadith front\
├── .env                        # Environment variables (API domain, reCAPTCHA key)
├── firebase.json               # Firebase Hosting configuration
├── package.json                # Dependencies & scripts
├── public/                     # Static assets (index.html, favicon, etc.)
├── build/                      # Production build output
└── src/
    ├── index.js                # Entry point — Redux store creation, ReactDOM.render
    ├── index.css               # Global styles
    ├── serviceWorker.js        # CRA service worker (unregistered)
    └── hadith/                 # Main application module
        ├── assets/css/         # Additional CSS
        ├── components/         # React components (see below)
        ├── fungsi/             # Utility/helper functions (26 files)
        ├── sender/
        │   ├── api.js                   # Central HTTP client (authFetch, token refresh)
        │   └── senderDataRequest.js     # Data fetching dispatcher
        └── store/              # Redux store
            ├── action.js               # Action types & creators
            ├── kitabsName.js           # Book name mappings
            ├── totalHaditsEachBook.js  # Hadith count per book
            └── reducer/               # ~30+ reducer files grouped by feature
```

---

## Key Architecture

### Entry Point — [index.js](file:///d:/Sugeng/gethadith front/src/index.js)

- Creates a Redux store with **~50 combined reducers** via `combineReducers`.
- Wraps `<App />` in `<Provider>` (Redux) and `<Router>` (React Router).
- Service worker is **unregistered** (no offline support currently).

### Root Component — [App.js](file:///d:/Sugeng/gethadith front/src/hadith/components/App.js)

- Class component connected to Redux for theme settings.
- Uses `MuiThemeProvider` with a dynamic theme from Redux state (`themeSetting.globalTheme`).
- Renders the main layout: `AppBar` → `ComboBox` → `GridBreakPoint` → plus dialogs/modals.

### Component Tree (top-level)

| Component | Purpose |
|---|---|
| [AppBar.js](file:///d:/Sugeng/gethadith front/src/hadith/components/AppBar.js) | Top navigation bar with search, settings, actions |
| [ComboBox.js](file:///d:/Sugeng/gethadith front/src/hadith/components/ComboBox.js) | Book/chapter selection dropdowns |
| [GridBreakPoint.js](file:///d:/Sugeng/gethadith front/src/hadith/components/GridBreakPoint.js) | Main content area with responsive grid layout |
| [Tabs.js](file:///d:/Sugeng/gethadith front/src/hadith/components/Tabs.js) | Tab navigation for content views |
| [ExpansionPanel.js](file:///d:/Sugeng/gethadith front/src/hadith/components/ExpansionPanel.js) | Expandable panels for hadith details |

### Feature Modules (subdirectories under `components/`)

| Module | Description |
|---|---|
| `Biography/` | Scholar biography display |
| `Bookmark/` | Bookmark management |
| `DialogForTab/` | Tab-based dialog windows |
| `FontSettings/` | Arabic/UI font size controls |
| `Grade/` | Hadith grading/classification display |
| `HadithTerm/` | Hadith terminology reference |
| `Info/` | Application information dialogs |
| `Keyboard/` | Virtual Arabic keyboard |
| `LoginForm/` | User authentication UI |
| `NavComponent/` | Navigation buttons/controls |
| `Note/` | User notes on hadith |
| `OptionSetting/` | App settings/preferences |
| `RawiSearch/` | Narrator (rawi) search functionality |
| `Report/` | Reporting feature |
| `Sanad/` | Chain of narration (sanad) visualization & diagram |
| `SearchInput/` | Search input field component |
| `SearchResult/` | Search results display |
| `Similar/` | Similar hadith discovery |
| `items/` | Shared/common item components |

---

## State Management (Redux)

The store has **~50 slices** organized by feature domain under `src/hadith/store/reducer/`:

- **Core data**: `mainBooksData`, `kitabData`, `babData`, `currentTable`, `numberEachBook`
- **Navigation**: `disableNavButton`, `valueOfShownKitab`, `indexTab`, `expandedPanel`
- **Search**: `searchResult`, `totalPerBook`, `inputValue`, `selectionIndex`, `checkToSearch`
- **Sanad**: `displaySanad`, `sanadData`, `sanadPosition`, `showProfile`, `diagramSanad`, `dialogProfileRawi`
- **Similar hadith**: `similar`, `displaySimilar`, `backFromSimilar`
- **Narrator search**: `queryValue`, `resultOfSearchRawi`, `clickedNarrator`, `rerenderTrigger`, `tabBodyHeightRef`
- **Notes**: `showNote`, `switchNoteMode`, `AllNotesData`
- **Bookmarks**: `bookmarkContent`, `tableOfBookmarks`, `deletionPending`
- **UI controls**: `snackBarsSetting`, `controlRadioCheck`, `inputComboValue`, `openAndClose`, `arabicKeyboard`
- **Appearance**: `fontSetting`, `themeSetting`, `lightDarkSwitch`, `showDetailsColor`
- **Other**: `biography`, `info`, `otherNumberData`, `openHadithTerm`, `tabDialog`

Actions are defined in [action.js](file:///d:/Sugeng/gethadith front/src/hadith/store/action.js).

---

## API Layer — [api.js](file:///d:/Sugeng/gethadith front/src/hadith/sender/api.js)

Central HTTP client with automatic JWT token refresh. Domain configured via `.env`:
- **Production**: `api.<domain>:9090`
- **Development**: `<domain>:8081`

Key exports:

| Export | Purpose |
|---|---|
| `switchServer` | Base API URL (auto-detected from env) |
| `getHeaders()` | Build headers with `Authorization: Bearer` |
| `setAuthData({token, refresh_token})` | Store tokens after login/signup |
| `clearAuthData()` | Remove tokens + dispatch `auth:logout` event |
| `getToken()` / `getRefreshToken()` | Token getters |
| `authFetch(url, init?, {onLoading?})` | Fetch wrapper with auto-refresh on 401 |

### Authentication Flow

1. **Login**: `POST /auths/login` → `{token, refresh_token}` — both stored via `setAuthData()`
2. **API calls**: All authenticated requests use `authFetch()` which auto-attaches `Authorization: Bearer`
3. **Token refresh**: On 401, `authFetch` calls `POST /auths/refresh` with `refresh_token` → stores new pair, retries original request
4. **Reuse detection**: If refresh token is presented twice, backend revokes all user refresh tokens → `clearAuthData()` fires `auth:logout` event → `LoginForm` reopens automatically, forcing re-login
5. **Concurrent 401s**: During token refresh, concurrent 401 requests are queued and retried once refresh completes
6. **`onLoading` callback**: Pass `{onLoading: bool => setState(...)}` as third argument to `authFetch` for future loading-state implementation

---

## Utilities — `src/hadith/fungsi/`

26 helper files covering:
- Text processing: `coloringFoundText`, `matchWithoutDiacritic`, `nestedColoring`, `replaceBraces`, `replaceDerajat`, `replaceNewLine`
- Data mapping: `getImamName`, `getKitabName`, `getTableName`, `getClassificationName`, `getPublisherName`, `getResearcherName`
- Theme: `getTheme`, `underlineThemeColor`
- Sanad: `getSortedSanads`, `getBgColorRawi`, `calculatePosition`
- Search: `sendSearchRequest`
- UI: `showSnackBar`, `deleteForSnackBar`, `clearData`, `closeDialogTab`

---

## Environment & Deployment

| Variable | Purpose |
|---|---|
| `NODE_ENV` | Set to `production` |
| `REACT_APP_DOMAIN_PREFIX_PROD` | API domain prefix for production |
| `REACT_APP_DOMAIN_PREFIX_DEV` | API domain prefix for dev |
| `REACT_APP_IP_SUFFIX_PROD` | API port for production (`:9090`) |
| `REACT_APP_IP_SUFFIX_DEV` | API port for dev (`:8081`) |
| `REACT_APP_RECAPTCHA_KEY` | Google reCAPTCHA site key |

Build & deploy: `npm run build` → `firebase deploy`
