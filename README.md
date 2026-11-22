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
<img width="1918" height="906" alt="Screenshot 2026-11-21 190856" src="https://github.com/user-attachments/assets/97d33742-aa01-49b9-aa58-5e11ec4766e2" />

<img width="1903" height="908" alt="Screenshot 2026-11-21 190922" src="https://github.com/user-attachments/assets/7f0b3ba9-1eac-45d6-b75d-6a6a24be5132" />


<img width="1903" height="907" alt="Screenshot 2026-11-21 190936" src="https://github.com/user-attachments/assets/c0988ca7-ef2f-4a6e-9ac8-245ce837cbc5" />


### Active Shift Clock-Out & Updated Timeclock Log
<img width="1902" height="908" alt="Screenshot 2026-11-21 190951" src="https://github.com/user-attachments/assets/3088f14a-a42d-4f7e-b24b-1463074bfae3" />


<img width="1901" height="905" alt="Screenshot 2026-11-21 191015" src="https://github.com/user-attachments/assets/17785273-e18e-4ac0-a182-5c98985f99ed" />


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
