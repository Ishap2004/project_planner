# Student Life Planner - API Documentation

Student Life Planner is a web application designed to help students organize their assignments, work tasks, and daily routines.

## Tech Stack
- **Backend**: Node.js, Express
- **Database**: MySQL (Aiven Cloud)
- **Authentication**: JWT, bcrypt

## Getting Started

1. Install dependencies: `npm install`
2. Configure `.env` with your database credentials and JWT secret.
3. Import `schema.sql` into your MySQL database.
4. Start the server: `npm start` or `npm run dev`

---

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login and receive a JWT token |
| GET    | `/api/auth/me`       | Get current logged-in user details (Protected) |

### Tasks (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/tasks` | Get all tasks for the logged-in user |
| POST   | `/api/tasks` | Create a new task |
| PUT    | `/api/tasks/:id` | Update task status |
| DELETE | `/api/tasks/:id` | Delete a task |

### Routines (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/routines` | Get all daily routines for the user |
| POST   | `/api/routines` | Create a new routine |
| PUT    | `/api/routines/:id` | Update routine completion status |
| DELETE | `/api/routines/:id` | Delete a routine |

---

## Example Requests

### Register User
`POST /api/auth/register`
```json
{
  "name": "Isha Patel",
  "email": "isha@example.com",
  "password": "yourpassword"
}
```

### Login
`POST /api/auth/login`
```json
{
  "email": "isha@example.com",
  "password": "yourpassword"
}
```
**Response:** `200 OK` with JSON `{ "token": "..." }`

### Create Task
`POST /api/tasks` (Headers: `Authorization: Bearer <token>`)
```json
{
  "title": "Study for PROG2500",
  "type": "Study",
  "due_date": "2026-04-01",
  "priority": "High"
}
```
