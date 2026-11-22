# AionDream

A full-stack timesheet and employee hour-tracking web application built with Node.js, Express.js, and EJS, designed to run in a browser or inside an **Electron** desktop wrapper/tablet terminal. It supports account registration, hashed password authentication with `bcrypt`, PIN-based clock-in/clock-out workflows with an on-screen numeric keypad, per-employee session timers, organization setup, and an employee dashboard—configured to run locally out of the box using in-memory mock data

## Features

- **Employee Registration & Login**: Creates user accounts with `bcrypt` password hashing, tracks session state via `express-session`, and routes authenticated users to `/dashboard`.
- **PIN-Based Time Clock & Kiosk Flow**: Supports `/homebase`, `/clockin`, and `/clockout` flows using employee PINs, numeric keypad input, live clock display, and `on` / `off` status checks.
- **Per-Employee Session Timers**: Tracks active shift start times and elapsed durations per employee PIN so multiple users can clock in and out independently without overwriting shared state.
- **Dashboard & Organization Setup**: Displays employee summary cards (Total Hours, Hours This Week, Total Sessions, Weekly Sessions), account details, organization setup (`POST /dashboard`), and the **Timeclock log** (`Date`, `Job`, `In`, `Out`, `Hours`).
- **Admin View**: Includes `/adminpanel` for viewing currently clocked-in employees.
- **Electron Compatibility**: Designed to work cleanly inside an Electron window (such as a front-desk or tablet time-clock terminal) loading the local Express server.

## Screenshots

### Landing & Welcome Screen
<img width="1919" height="1079" alt="Screenshot 2026-11-21 190717" src="https://github.com/user-attachments/assets/0db28c4b-ee1d-41fe-9f56-f5baf8a5baa7" />


### Dashboard & Organization Setup
<img width="1919" height="903" alt="Screenshot 2026-11-21 150555" src="https://github.com/user-attachments/assets/25db1236-ec22-4810-894b-dd647d5db76d" />

<img width="1919" height="1079" alt="Screenshot 2026-11-21 190822" src="https://github.com/user-attachments/assets/181764f2-f8db-43af-a5ac-8e9bc50f1b90" />

### Homebase Keypad & Clock-In Flow
![Homebase organization keypad screen](screenshots/Screenshot%202026-11-21%20190856.jpg)
![Clock in action screen](screenshots/Screenshot%202026-11-21%20190922.jpg)

![PIN entry keypad with live clock](screenshots/Screenshot%202026-11-21%20190936.jpg)

### Active Shift Clock-Out & Updated Timeclock Log
![Clock out action screen](screenshots/Screenshot%202026-11-21%20190951.jpg)

![Employee dashboard showing updated hours, sessions, and timeclock log](screenshots/Screenshot%202026-11-21%20191015.png)

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
