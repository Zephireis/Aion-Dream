# AionDream

A full-stack timesheet and employee hour-tracking web application built with **Node.js**, **Express.js**, and **EJS**. It supports account registration, hashed password authentication with `bcrypt`, PIN-based clock-in/clock-out workflows, session timers, and an employee dashboard—configured to run locally out of the box using in-memory mock data.

## Features

- **Employee Registration & Login:** Creates user accounts with `bcrypt` password hashing and routes authenticated users to the dashboard.
- **PIN-Based Time Clock:** Supports `/homebase`, `/clockin`, and `/clockout` flows using employee PINs and status checks (`on` / `off`).
- **Session Tracking & Dashboard:** Displays employee summary details, total sessions, hours, and logged entries on `/dashboard`.
- **Admin View:** Includes `/adminpanel` for checking currently clocked-in employees.


## Project Structure

```text
AionDreams/
├── apps.js          # Express server, routes, timer/clock logic, and local mock store
├── views/           # EJS templates (dashboard, login, register, homebase, clockin, clockout, adminpanel, etc.)
├── css/             # Stylesheets mounted under /aion/css
├── scripts/         # Client-side scripts mounted under /aion/scripts
├── public/          # Static public assets
└── package.json     # Project dependencies and scripts
