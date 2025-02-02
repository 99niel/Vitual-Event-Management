# Virtual Event Management

## Overview

The **Virtual Event Management** application provides an efficient platform for organizing, registering, and managing virtual events. This application supports user registration, event creation, and event participation with role-based access control for organizers and participants.

### Key Features:

- **User Authentication**: Role-based access for users (Admin, Organizer, Participant).
- **Event Creation**: Organizers can create events with detailed information.
- **Event Registration**: Participants can register for events.
- **Event Listing**: View all available events.
- **Event Cancellation**: Registered users can cancel their participation in events.
- **Event Management**: Organizers can manage their events, view registrations, and update event details.

---

## Table of Contents

1. [Installation](#installation)
2. [Technologies](#technologies)
3. [Features](#features)
4. [API Endpoints](#api-endpoints)
5. [How to Use](#how-to-use)
6. [Database Structure](#database-structure)
7. [Contributing](#contributing)
8. [License](#license)

---

## Installation

To run the Virtual Event Management app locally, follow these steps:

### Prerequisites:

- Node.js (v14 or higher)
- MongoDB (or a MongoDB Atlas account)
- Git (to clone the repository)

### Steps to Run Locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/99niel/Vitual-Event-Management.git

   ```

2. Navigate into the project directory:
   cd Vitual-Event-Management

3. Install dependencies:
   npm install

4. Rename the .env.example file to .env and update it with your environment settings (such as MongoDB URI, JWT secret, etc.):
   cp .env.example .env
   Example .env file:
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/virtual_event_db
   JWT_SECRET=your-secret-key

5. Start the application:
   npm start
   This will start the application on http://localhost:3000.

## Technologies

The application uses the following technologies:
-Backend:
-Node.js
-Express.js
-MongoDB (Mongoose for data modeling)
-JWT (JSON Web Tokens) for authentication
-Joi for validation
-Bcrypt for password hashing

## Features

1. User Authentication:
   Sign Up: Register new users with role-based access (Admin, Organizer, Participant).
   Login: Return a JWT token after successful authentication.
   Authorization: Role-based access control ensures that only organizers can create events.
2. Event Management:
   Create Event: Organizers can create events by providing details such as date, time, description, participants, and more.
   Update Event: Organizers can modify event details.
   Delete Event: Organizers can delete events if needed.
3. Event Registration:
   Register for Events: Participants can register for any available event.
   Cancel Registration: Participants can cancel their event registration.
4. Event Listing:
   Get All Events: View a list of all upcoming events available for registration.
   Get Event Details: View detailed information about a specific event.

## API Endpoints

1. User Authentication
   POST /users/signup
   Description: Register a new user.

```bash
Body:{
 "name": "John Doe",
 "email": "john.doe@example.com",
 "password": "password123",
 "role": "participant"
}
```

POST /users/login
Description: Login to an existing account and receive a JWT token.
Body:

```bash
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

2. Event Management
   POST /events/create
   Description: Create a new event (Organizers only).
   Body:

```bash
{
  "date": "2025-12-25",
  "time": "18:00",
  "description": "Annual Virtual Meetup",
  "participants": 100
}
```

GET /events/all
Description: Get a list of all available events.
Response:

```bash
[
  {
    "id": "event_id",
    "date": "2025-12-25",
    "time": "18:00",
    "description": "Annual Virtual Meetup",
    "participants": 100
  }
]
```

3. Event Registration

POST /registration/register/:id
Description: Register a participant for an event.
Params:
id: Event ID
Response:

```bash
{
  "message": "Successfully registered for the event",
  "registration": {
    "eventId": "event_id",
    "userId": "user_id"
  }
}
```

POST /registration/cancel/:id
Description: Cancel a participant’s registration for an event.
Params:
id: Event ID
Response:

```bash
{
  "message": "Successfully canceled registration",
  "registration": {
    "eventId": "event_id",
    "userId": "user_id"
  }
}
```

## How to Use

-Sign Up: Register a user through the /users/signup endpoint with the role set to either organizer or participant.
-Login: Authenticate and get a JWT token through the /users/login endpoint.
-Create Event: If you are an organizer, use the /events/create endpoint to create an event.
-Register for Event: As a participant, register for an event using the /registration/register/:id endpoint.
-Cancel Registration: If necessary, you can cancel your registration using /registration/cancel/:id.

## Database Structure

User Model:

```bash
{
  name: String,
  email: String,
  password: String, // Hashed password
  role: String, // 'organizer' or 'participant'
}
```

Event Model:

```bash
{
  date: Date,
  time: String,
  description: String,
  participants: Number,
  createdBy: ObjectId, // Reference to the user who created the event
}

```

Registration Model:

```bash
{
  userId: ObjectId, // Reference to the user
  eventId: ObjectId, // Reference to the event
  status: String, // 'registered' or 'canceled'
}

```

## Contributing

-We welcome contributions to improve the Virtual Event Management project. To contribute:

-Fork the repository.
-Create a new branch for your feature (git checkout -b feature/your-feature).
-Commit your changes (git commit -m 'Add new feature').
-Push to the branch (git push origin feature/your-feature).
-Open a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
