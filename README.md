# Task Management Web App

A vanilla JavaScript todo list application built as part of [The Odin Project](https://www.theodinproject.com/) curriculum.

Live demo: https://tanwa1.github.io/ToDoApp/

## Features

- **Projects** — Organize todos into separate projects. A default "Inbox" project is created automatically.
- **Full CRUD** — Create, view, edit, and delete todos with title, description, due date, and priority.
- **Expandable Details** — Click a todo to expand/collapse its description, due date, and priority.
- **Priority Indicators** — Color-coded left border (green/orange/red) shows Low/Medium/High priority at a glance.
- **Filter Views** — Sidebar filters for Upcoming, Low/Medium/High priority, and Completed todos across all projects.
- **Persistence** — All data is saved to `localStorage` and restored on page load.
- **Modular Architecture** — Separated into models, store, storage, UI, validation, and controller modules following SOLID principles.

## Tech Stack

- Vanilla JavaScript (ES Modules)
- SCSS
- Webpack (dev server + production build)
- date-fns for date formatting
- localStorage for persistence

## Getting Started

### Prerequisites

- Node.js and npm

### Installation

```sh
git clone https://github.com/tanwa1/ToDoApp.git
cd ToDoApp
npm install
```

### Development

```sh
npm run start
```

Opens at [http://localhost:8080](http://localhost:8080).

### Production Build

```sh
npm run build
```

Output goes to the `dist/` folder.

## Project Structure

```
src/
├── index.js          # Entry point
├── index.html        # HTML template with dialogs
├── style.scss        # All styling
├── models.js         # ToDo and Project classes
├── store.js          # State management and CRUD operations
├── storage.js        # localStorage persistence and data revival
├── controller.js     # Event listeners and DOM coordination
├── ui.js             # DOM rendering functions
├── validation.js     # Form input validation
└── assets/           # Icons and images
```

## Project Structure
```
ToDoApp/
├── dist/                # Production build output
├── node_modules/        # Dependencies
├── src/                 # Source files
│   ├── assets/          # Images and static assets
│   ├── index.html       # HTML template
│   ├── index.js         # App entry
│   ├── main.js          # Main module (app logic)
├── package.json         # Project metadata and scripts
├── webpack.common.js    # Webpack common config
├── webpack.dev.js       # Webpack dev config
├── webpack.prod.js      # Webpack prod config
└── README.md            # Project documentation
```
