
# Chat UI with Gemeina AI

This is a React-based chat UI application for interacting with **Gemeina AI**. Built with TypeScript and modern frontend tooling, it provides a responsive interface, real-time updates via WebSockets, client-side routing, and HTTP integration for fallback or auxiliary requests.

## Deployment Link
Link here (https://effortless-stardust-171e1c.netlify.app/)

## Overview

The app exposes a chat interface where a user can converse with Gemeina AI. Core features include:

- Reactive UI built in React + TypeScript
- Tailwind CSS styling with Flowbite components for consistent design
- HTTP communication via Axios
- Client-side routing via React Router
- Real-time bidirectional messaging using WebSockets
- Bundled and served with Vite for fast development and optimized production builds

## Tools & Technologies

- **React** (with TypeScript) – UI library and type safety
- **Vite** – Build tool / dev server
- **Tailwind CSS** + **Flowbite** – Utility-first styling and component primitives
- **Axios** – HTTP client for REST-style calls to Gemeina AI or supporting endpoints
- **React Router** – SPA navigation and route management
- **WebSockets** – Real-time messaging channel for live chat updates
- **TypeScript** – Static typing for robustness

## Setup Instructions

Follow these steps to get the project running locally or build it for production.

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <your-project-directory>
```
````

### 2. Install dependencies

```bash
npm install
```

### 3. Local development server

Start the Vite development server with hot reload:

```bash
npm run dev
```

By default this will serve the app at `http://localhost:5173` (or the port Vite reports).

### 4. Production build

Create an optimized production bundle:

```bash
npm run build
```

The static output will be in the `dist/` directory, ready to deploy.

### 5. (Optional) Environment configuration

If the app consumes external endpoints (e.g., Gemeina AI REST API or WebSocket URL), create a `.env` or `.env.local` file based on a sample. Example `.env.example`:

```env
VITE_API_BASE_URL=https://api.gemeina.ai
VITE_WS_URL=wss://ws.gemeina.ai/chat
```

Then create `.env` and supply your actual values:

```bash
cp .env.example .env
# edit .env to fill in real endpoints or keys if needed
```

Vite exposes these to the client if prefixed with `VITE_` (e.g., `import.meta.env.VITE_API_BASE_URL`).

---

- `npm run dev` — development server
- `npm run build` — production bundle
- `npm run preview` — locally preview built output

---

## Notes

- WebSocket connections typically use the `VITE_WS_URL` environment variable; make sure the server supports the expected protocol and authentication if any.
- Axios should be configured with the base URL from `import.meta.env.VITE_API_BASE_URL` for consistent API calls.
- React Router handles multi-view chat flows (e.g., conversation history, settings) without full page reloads.
