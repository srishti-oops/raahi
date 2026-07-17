# Raahi

A full-stack productivity platform built using Spring Boot and Firebase. Raahi helps users manage goals, build habits, maintain a daily journal, track productivity, and monitor progress through a single application.

**Live Demo:** https://raahi-production-1e8e.up.railway.app

---

## Overview

Raahi was built to provide a unified productivity workspace where users can manage goals, habits, journals, and progress without relying on multiple applications. The project focuses on creating a clean, responsive, and organized experience backed by a scalable Spring Boot architecture and Firebase cloud services.

---

## Features

- User Authentication
- Goal Management
- Habit Tracking with Streaks
- Daily Journal
- Productivity Analytics
- Achievement System
- Dashboard Overview
- Responsive User Interface
- Firebase Authentication
- Firestore Database Integration

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Java, Spring Boot |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| Build Tool | Maven |
| Deployment | Railway |
| Version Control | Git & GitHub |

---

## System Architecture

```text
                           User
                            │
                            ▼
                 HTML • CSS • JavaScript
                            │
                     REST API Requests
                            │
                            ▼
                 Spring Boot Backend
                            │
           ┌────────────────┴────────────────┐
           ▼                                 ▼
Firebase Authentication          Firebase Firestore
                                            │
                                            ▼
                         Users • Goals • Habits • Journals
```

---

## Request Flow

```text
Browser
   │
   ▼
JavaScript
   │
HTTP Request
   │
   ▼
Controller
   │
   ▼
Service
   │
   ▼
Firestore
   │
   ▼
Response
   │
   ▼
Browser
```

---

## Project Structure

```text
raahi
│
├── src
│   ├── main
│   │   ├── java
│   │   │   └── com.raahi.raahi
│   │   │       ├── config
│   │   │       ├── controller
│   │   │       ├── model
│   │   │       ├── repository
│   │   │       ├── service
│   │   │       └── RaahiApplication.java
│   │   │
│   │   └── resources
│   │       ├── static
│   │       ├── firebase
│   │       └── application.properties
│
├── pom.xml
└── README.md
```

---

## REST APIs

### Goals

| Method | Endpoint |
|---------|----------|
| GET | `/api/goals` |
| POST | `/api/goals` |
| PUT | `/api/goals/{id}` |
| DELETE | `/api/goals/{id}` |

### Habits

| Method | Endpoint |
|---------|----------|
| GET | `/api/habits` |
| POST | `/api/habits` |
| PUT | `/api/habits/{id}` |
| DELETE | `/api/habits/{id}` |

### Journal

| Method | Endpoint |
|---------|----------|
| GET | `/api/journals` |
| POST | `/api/journals` |
| PUT | `/api/journals/{id}` |
| DELETE | `/api/journals/{id}` |

---

## Running Locally

Clone the repository

```bash
git clone https://github.com/srishti-oops/Raahi.git
```

Navigate to the project directory

```bash
cd Raahi
```

Run the application

```bash
mvn spring-boot:run
```

Open

```
http://localhost:8080
```

---

## Deployment

The application is deployed on Railway.

Sensitive Firebase credentials are managed using environment variables and are not intended to be exposed publicly.

---

## Author

**Srishti Priya**

GitHub: https://github.com/srishti-oops

LinkedIn: https://www.linkedin.com/in/srishti-priya-36835b323/
