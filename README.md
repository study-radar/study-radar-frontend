# StudyRadar

A full-stack web app for UCLA students to create and join study group events. Built as the final project for UCLA's CS 35L (Software Construction).

**Live:** [study-radar-frontend](https://github.com/study-radar/study-radar-frontend) | **Backend:** [study-radar-backend](https://github.com/study-radar/study-radar-backend)

## Features

- **Authentication** -- Sign up, log in, forgot password (Firebase Auth)
- **Home feed** -- View your upcoming study group events with agenda sidebar
- **Create Event** -- Post a new study group with subject, time, location, and description
- **Explore** -- Browse all public study groups and join or leave with one click
- **Calendar** -- Visual calendar view of events (`react-big-calendar` + Syncfusion scheduler)
- **Profile** -- Update account details

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React (Create React App + CRACO) |
| Routing | React Router v6 |
| Auth & DB | Firebase (Authentication + Firestore) |
| Styling | Bootstrap, React-Bootstrap, styled-components, Tailwind CSS |
| Calendar | react-big-calendar, @syncfusion/ej2-react-schedule |
| HTTP | Axios |
| Backend | [study-radar-backend](https://github.com/study-radar/study-radar-backend) (Node.js/PostgreSQL) |

## Project Structure

```
src/
├── screens/        # Page-level components (Login, SignUp, Home, Explore, CreateEvent, Calendar, etc.)
├── components/     # Reusable UI (StudyGroupCard, Agenda, JoinLeaveButton, PrivateRoute, etc.)
├── contexts/       # React context providers (auth state)
├── services/       # API calls via Axios
└── firebase.js     # Firebase app initialization
```

## Setup

```bash
git clone https://github.com/study-radar/study-radar-frontend.git
cd study-radar-frontend
npm install
```

Create a `.env.local` file with your Firebase config:
```
REACT_APP_FIREBASE_API_KEY=...
REACT_APP_FIREBASE_AUTH_DOMAIN=...
REACT_APP_FIREBASE_PROJECT_ID=...
```

Start the dev server:
```bash
npm start
```

Visit [http://localhost:3000](http://localhost:3000). Connect the backend by following instructions at [study-radar-backend](https://github.com/study-radar/study-radar-backend).
