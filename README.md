# Reddit Client 🦊

A lightweight, responsive React application that fetches and displays posts from selected subreddits using the Reddit API. Designed with a clean UI, dark mode support, and multiple user-driven features.

---

## ✨ Features

- 🔍 **Subreddit Search** — Enter any subreddit manually or select from a dropdown  
- 💬 **Post Details** — View full post content and threaded comments  
- 🌙 **Dark Mode** — Toggle between light and dark themes  
- 🚀 **Responsive Design** — Optimized for desktop and mobile  
- ⚛️ **Redux State Management** — Global state for posts and UI settings  

---

## 🧪 Testing

This project includes comprehensive **unit** and **end-to-end (E2E)** test coverage:

### ✅ Unit / Component Testing (via Vitest + React Testing Library)

- `TopBar`, `PostCard`, `PostDetail`, `Comment`  
- Covers UI rendering, props, async behavior, and loading states  

### ✅ E2E Testing (via Cypress)

Live user flows tested:
- **Search flow**: Enter query → view filtered posts  
- **Comments navigation**: Click post → view full post + comments  
- **Subreddit switching**: Via dropdown and manual input  
- **Theme toggling**: Light ↔ Dark mode persistence  

---

## 🛠 Getting Started

Install dependencies:

```bash
yarn install
```

### Run the app locally:

```bash
yarn dev
```

### 🔬 Run Unit Tests:

```bash
yarn test
```

### 🧪 Run Cypress Tests:

Start Vite in one terminal:

```bash
yarn dev
```

Then open Cypress in another:

```bash
yarn cypress open
```

---

## 📁 Project Structure

```
project-root/
├── cypress/
│   ├── downloads/
│   ├── e2e/             # End-to-end tests (Cypress specs)
│   ├── fixtures/        # Test data (if needed)
│   └── support/         # Custom commands and config
├── public/              # Static assets
├── src/
│   ├── assets/          # Logos, icons, media
│   ├── components/
│   │   ├── Comment.jsx
│   │   ├── Comment.test.jsx
│   │   ├── PostDetail.jsx
│   │   ├── PostDetail.test.jsx
│   │   └── PostDetail.css
│   ├── features/
│   │   ├── app/         # Store config (if present)
│   │   ├── posts/
│   │   │   ├── PostCard.jsx
│   │   │   ├── PostCard.test.jsx
│   │   │   ├── PostList.jsx
│   │   │   ├── PostList.test.jsx
│   │   │   ├── PostList.css
│   │   │   └── postsSlice.js
│   │   ├── searchResults/
│   │   │   ├── SearchResults.jsx
│   │   │   ├── SearchResults.test.jsx
│   │   │   └── SearchResults.css
│   │   └── subreddit/
│   │       └── subredditSlice.js
│   ├── layout/
│   │   ├── TopBar.jsx
│   │   ├── TopBar.test.jsx
│   │   └── TopBar.css
│   └── styles/
│       ├── App.css
│       └── theme.css
```

---

## 📦 Built With

- React  
- Redux Toolkit  
- React Router  
- Vitest  
- Cypress  

---

## 📌 Notes

This is a learning-focused project. APIs are fetched live from Reddit and may return inconsistent results. For production use, caching and pagination are recommended.

---

## 🧠 Author

Jeremie

