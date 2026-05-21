# Gym Membership & Workout Planner

A comprehensive web application for managing gym memberships, scheduling workouts, and tracking fitness progress. This full-stack application provides separate dashboards for members and trainers with features for membership management, appointment booking, and health tracking.

## Features

### Member Features
- **Member Registration & Profile Management** - Create and manage gym membership accounts
- **Dashboard** - View membership details and quick stats
- **Health Tracking** - Log and track health metrics
- **Workout Scheduling** - View and plan personalized workout routines
- **Trainer Appointments** - Book appointments with certified trainers
- **Progress Tracking** - Monitor fitness progress over time

### Trainer Features
- **Trainer Dashboard** - Manage clients and appointments
- **Appointment Management** - View and manage scheduled appointments with members
- **Client Roster** - Access to list of all clients

## Tech Stack

### Backend
- **Framework**: ASP.NET Core
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Authentication**: ASP.NET Core Identity
- **API Documentation**: Swagger/OpenAPI
- **Language**: C#

### Frontend
- **Library**: React
- **Routing**: React Router
- **Styling**: CSS
- **Language**: JavaScript (JSX)

## Project Structure

```
GymMembershipAndWorkoutPlanner/
├── backend/
│   ├── GymMembershipAPI.csproj
│   ├── Startup.cs                 # API configuration and middleware
│   ├── Controllers/
│   │   └── Controllers.cs         # API endpoints
│   ├── Data/
│   │   └── GymMembershipContext.cs # Database context
│   └── Models/
│       └── Models.cs              # Data models
├── frontend/
│   └── src/
│       ├── App.jsx                # Main application component
│       ├── App.css                # Global styles
│       └── components/
│           ├── MemberComponents.jsx    # Member-related UI components
│           ├── TrainerComponents.jsx   # Trainer-related UI components
│           └── HealthComponents.jsx    # Health tracking UI components
└── README.md
```

## Installation & Setup

### Prerequisites
- .NET 5.0 or higher
- Node.js 14+ and npm
- SQL Server (local or remote)
- Git

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Update the database connection string in `appsettings.json`:
   ```json
   {
     "ConnectionStrings": {
       "GymMembershipConnection": "Server=YOUR_SERVER;Database=GymMembership;User Id=YOUR_USER;Password=YOUR_PASSWORD;"
     }
   }
   ```

3. Install dependencies and apply migrations:
   ```bash
   dotnet restore
   dotnet ef database update
   ```

4. Run the backend API:
   ```bash
   dotnet run
   ```
   The API will be available at `https://localhost:5001`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   The application will open at `http://localhost:3000`

## Usage

### For Members
1. Sign up or log in with your member credentials
2. Navigate to the member dashboard to view your profile
3. Track your health metrics in the Health Tracking section
4. View and plan your workouts in the Workout Schedule
5. Book appointments with trainers
6. Monitor your progress over time

### For Trainers
1. Log in with your trainer credentials
2. Access your trainer dashboard
3. View all scheduled appointments
4. Manage client relationships

## API Endpoints

The backend API provides the following main endpoints (see Swagger documentation for complete details):

### Members
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member
- `GET /api/members/{id}` - Get specific member
- `PUT /api/members/{id}` - Update member
- `DELETE /api/members/{id}` - Delete member

### Trainers
- `GET /api/trainers` - Get all trainers
- `POST /api/trainers` - Create new trainer
- `GET /api/trainers/{id}` - Get specific trainer

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/{id}` - Get appointment details
- `PUT /api/appointments/{id}` - Update appointment

## API Documentation

Swagger/OpenAPI documentation is available at `https://localhost:5001/swagger` when running the backend.

## Development

### Backend Development
- Models are defined in `Models/Models.cs`
- API endpoints are in `Controllers/Controllers.cs`
- Database context and migrations are in `Data/GymMembershipContext.cs`

### Frontend Development
- React components are in `src/components/`
- Main app logic is in `src/App.jsx`
- Styling is managed in `src/App.css`

## Future Enhancements
- Payment integration for membership subscriptions
- Real-time notifications for appointments
- Mobile app (React Native)
- Advanced analytics and reporting
- Integration with fitness tracking devices
- Video tutorials for workout routines

---
