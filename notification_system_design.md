# Notification System Design

## Overview

This project is a full-stack notification system built using:

- React + TypeScript frontend
- Express + TypeScript backend
- Reusable centralized logging middleware

The system allows users to:

- Create notifications
- View notifications
- Log important application events

---

# Backend Architecture

The backend follows a modular architecture:

notification_app_be/
├── controllers
├── routes
├── services
├── middleware
├── utils

## Main Features

- REST API for notifications
- Centralized reusable logging utility
- Error handling
- Modular folder structure

---

# Frontend Architecture

The frontend is built using React and Material UI.

notification_app_fe/
├── components
├── pages
├── services

## Main Features

- Create notification form
- Notification listing UI
- Backend API integration

---

# Logging Middleware

A reusable logging utility was created to send logs to the evaluation server.

Example:

```ts
await Log(
  "backend",
  "info",
  "controller",
  "Notification created"
);