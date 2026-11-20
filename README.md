# FocusBoard Lite

A small, accessible task manager built with **HTML, CSS and JavaScript**. A practical learning project that works without an account, database, or external service.

## Features

- Create tasks with priority (low, medium, high)
- Mark tasks as completed and remove individual tasks
- Search and filter pending or completed tasks
- Automatically save data locally in the browser when storage is available
- No external dependencies and no data sent to a server
- Pure-function tests using the built-in Node.js test runner

## Run locally

Because the app imports an ES module, serve the folder using a small local server:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

## Tests

Requires a recent Node.js version with the built-in test runner (Node.js 18+):

```bash
npm test
```

## Publish with GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, `main`, `/ (root)`.

The website URL will be `https://alberthqs.github.io/focusboard-lite/` after publication (not before).

## Privacy

Tasks stay in the user's own browser storage; clearing browser storage deletes them. No passwords or personal data are required.

## Learning note

This project was prepared with AI assistance as an educational example. Review and customize its code as you learn.
