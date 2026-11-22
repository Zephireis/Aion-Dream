# AionDream

A full-stack timesheet and employee hour-tracking web application built with Node.js, Express.js, and EJS, designed to run in a browser or inside an **Electron** desktop wrapper/tablet terminal[cite: 1, 4, 6]. It supports account registration, hashed password authentication with `bcrypt`, PIN-based clock-in/clock-out workflows with an on-screen numeric keypad, per-employee session timers, organization setup, and an employee dashboard—configured to run locally out of the box using in-memory mock data[cite: 1, 2, 4, 5, 6, 7, 8].

## Features

- **Employee Registration & Login**: Creates user accounts with `bcrypt` password hashing, tracks session state via `express-session`, and routes authenticated users to `/dashboard`[cite: 1, 8].
- **PIN-Based Time Clock & Kiosk Flow**: Supports `/homebase`, `/clockin`, and `/clockout` flows using employee PINs, numeric keypad input, live clock display, and `on` / `off` status checks[cite: 4, 5, 6, 7].
- **Per-Employee Session Timers**: Tracks active shift start times and elapsed durations per employee PIN so multiple users can clock in and out independently without overwriting shared state[cite: 5, 6, 7, 8].
- **Dashboard & Organization Setup**: Displays employee summary cards (Total Hours, Hours This Week, Total Sessions, Weekly Sessions), account details, organization setup (`POST /dashboard`), and the **Timeclock log** (`Date`, `Job`, `In`, `Out`, `Hours`)[cite: 2, 8].
- **Admin View**: Includes `/adminpanel` for viewing currently clocked-in employees.
- **Electron Compatibility**: Designed to work cleanly inside an Electron window (such as a front-desk or tablet time-clock terminal) loading the local Express server.

## Screenshots

### Landing & Welcome Screen
<img width="1919" height="1079" alt="Screenshot 2026-11-21 190717" src="https://github.com/user-attachments/assets/0db28c4b-ee1d-41fe-9f56-f5baf8a5baa7" />


### Dashboard & Organization Setup
![Dashboard with organization setup modal](screenshots/Screenshot%202026-11-21%20190822.png)[cite: 2]

![Dashboard organization modal view](screenshots/Screenshot%202026-11-21%20190838.png)[cite: 3]

### Homebase Keypad & Clock-In Flow
![Homebase organization keypad screen](screenshots/Screenshot%202026-11-21%20190856.jpg)[cite: 4]

![Clock in action screen](screenshots/Screenshot%202026-11-21%20190922.jpg)[cite: 5]

![PIN entry keypad with live clock](screenshots/Screenshot%202026-11-21%20190936.jpg)[cite: 6]

### Active Shift Clock-Out & Updated Timeclock Log
![Clock out action screen](screenshots/Screenshot%202026-11-21%20190951.jpg)[cite: 7]

![Employee dashboard showing updated hours, sessions, and timeclock log](screenshots/Screenshot%202026-11-21%20191015.png)[cite: 8]

## Project Structure

```text
AionDreams/
├── apps.js          # Express server, routes, session/timer logic, and local mock store
├── screenshots/     # README screenshots referenced above
├── views/           # EJS templates (dashboard, login, register, homebase, clockin, clockout, adminpanel, etc.)
├── css/             # Stylesheets mounted under /aion/css
├── scripts/         # Client-side scripts mounted under /aion/scripts
├── public/          # Static public assets
└── package.json     # Project dependencies and scripts
