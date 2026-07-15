# Raahi

A full-stack productivity platform built using Spring Boot, Firebase and Gemini API. Raahi helps users manage goals, build habits, maintain a daily journal and receive AI-powered productivity guidance from a single application.

**Live Demo:** https://raahi-production-1e8e.up.railway.app

---

## Overview

The idea behind Raahi was to create a single platform where users can manage their daily productivity without switching between multiple applications. It combines goal management, habit tracking, journaling, analytics and AI assistance into one workspace.

---

## Features

- Goal management
- Habit tracking with streaks
- Daily journal
- AI-powered productivity coach
- Productivity analytics
- Achievement system
- Firebase Authentication
- Firestore integration
- Responsive user interface

---

## Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | HTML, CSS, JavaScript |
| Backend | Java, Spring Boot |
| Database | Firebase Firestore |
| Authentication | Firebase Authentication |
| AI Integration | Gemini API |
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
          ┌──────────────────┴──────────────────┐
          │                                     │
          ▼                                     ▼
   REST API Requests                     AI Coach (JavaScript)
          │                                     │
          ▼                                     ▼
   Spring Boot Backend                    Gemini API
          │
          ▼
 Firebase Authentication
          │
          ▼
   Firebase Firestore
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
Sensitive credentials such as Firebase Admin SDK and API keys are managed through Railway environment variables and are not stored in this repository.

---

## Challenges

- Integrating Firebase with Spring Boot
- Designing REST APIs for multiple modules
- Secure cloud deployment without exposing credentials
- Integrating Gemini API into the productivity workflow
- Maintaining a consistent user interface across modules

---

## Future Improvements

- Calendar integration
- Email reminders
- Mobile application
- Team collaboration
- Enhanced AI recommendations

---

## Author

Srishti Priya
GitHub: https://github.com/srishti-oops
LinkedIn: https://www.linkedin.com/in/srishti-priya-36835b323/
