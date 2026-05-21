import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import MemberDashboard, { MemberRegistration, MembersList } from './MemberComponents';
import TrainerDashboard, { TrainerRegistration, AppointmentBooking, AppointmentsList } from './TrainerComponents';
import { HealthTracking, WorkoutSchedule, ProgressTracking } from './HealthComponents';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'member' or 'trainer'

  const handleMemberLogin = (memberId) => {
    setUser(memberId);
    setUserType('member');
  };

  const handleTrainerLogin = (trainerId) => {
    setUser(trainerId);
    setUserType('trainer');
  };

  const handleLogout = () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <div className="navbar-brand">
            <h1>💪 Gym Membership & Workout Planner</h1>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            {user && userType === 'member' && (
              <>
                <li><Link to="/member-dashboard">My Dashboard</Link></li>
                <li><Link to="/health-tracking">Health Tracking</Link></li>
                <li><Link to="/workout-schedule">Workout Plan</Link></li>
                <li><Link to="/book-appointment">Book Appointment</Link></li>
                <li><Link to="/progress">Progress</Link></li>
              </>
            )}
            {user && userType === 'trainer' && (
              <>
                <li><Link to="/trainer-dashboard">My Dashboard</Link></li>
                <li><Link to="/appointments">Appointments</Link></li>
              </>
            )}
            {!user && (
              <>
                <li><Link to="/member-login">Member Login</Link></li>
                <li><Link to="/trainer-login">Trainer Login</Link></li>
              </>
            )}
            {user && (
              <li><button className="btn-logout" onClick={handleLogout}>Logout</button></li>
            )}
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage userType={userType} user={user} />} />

            {/* Authentication Routes */}
            <Route path="/member-login" element={<MemberLoginForm onLogin={handleMemberLogin} />} />
            <Route path="/trainer-login" element={<TrainerLoginForm onLogin={handleTrainerLogin} />} />

            {/* Member Routes */}
            <Route
              path="/member-dashboard"
              element={user && userType === 'member' ? <MemberDashboard memberId={user} /> : <Navigate to="/member-login" />}
            />
            <Route
              path="/health-tracking"
              element={user && userType === 'member' ? <HealthTracking memberId={user} /> : <Navigate to="/member-login" />}
            />
            <Route
              path="/workout-schedule"
              element={user && userType === 'member' ? <WorkoutSchedule memberId={user} /> : <Navigate to="/member-login" />}
            />
            <Route
              path="/book-appointment"
              element={user && userType === 'member' ? <AppointmentBooking memberId={user} /> : <Navigate to="/member-login" />}
            />
            <Route
              path="/progress"
              element={user && userType === 'member' ? <ProgressTracking memberId={user} /> : <Navigate to="/member-login" />}
            />
            <Route path="/member-registration" element={<MemberRegistration onSuccess={handleMemberLogin} />} />
            <Route path="/members-list" element={<MembersList />} />

            {/* Trainer Routes */}
            <Route
              path="/trainer-dashboard"
              element={user && userType === 'trainer' ? <TrainerDashboard trainerId={user} /> : <Navigate to="/trainer-login" />}
            />
            <Route
              path="/appointments"
              element={user && userType === 'trainer' ? <AppointmentsList trainerId={user} /> : <Navigate to="/trainer-login" />}
            />
            <Route path="/trainer-registration" element={<TrainerRegistration onSuccess={handleTrainerLogin} />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Gym Membership & Workout Planner. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

// Home Page Component
function HomePage({ userType, user }) {
  return (
    <div className="home-page">
      <div className="hero-section">
        <h2>Welcome to Gym Membership & Workout Planner</h2>
        <p>Your comprehensive fitness management platform</p>
        
        {!user ? (
          <div className="hero-buttons">
            <Link to="/member-login" className="btn btn-primary">Member Login</Link>
            <Link to="/member-registration" className="btn btn-secondary">Member Registration</Link>
            <Link to="/trainer-login" className="btn btn-primary">Trainer Login</Link>
            <Link to="/trainer-registration" className="btn btn-secondary">Trainer Registration</Link>
          </div>
        ) : (
          <div className="welcome-message">
            <p>Welcome back! You are logged in as a {userType}</p>
          </div>
        )}
      </div>

      <section className="features-section">
        <h3>Key Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <h4>📋 Membership Management</h4>
            <p>Track subscriptions, renewals, and membership details</p>
          </div>
          <div className="feature-card">
            <h4>📅 Appointment Scheduling</h4>
            <p>Book and manage trainer appointments easily</p>
          </div>
          <div className="feature-card">
            <h4>💪 Workout Planning</h4>
            <p>Personalized workout schedules and exercises</p>
          </div>
          <div className="feature-card">
            <h4>📊 Health Tracking</h4>
            <p>Monitor calories, sleep, and water intake</p>
          </div>
          <div className="feature-card">
            <h4>📈 Progress Monitoring</h4>
            <p>Track your fitness progress and achievements</p>
          </div>
          <div className="feature-card">
            <h4>💬 Trainer Communication</h4>
            <p>Direct messaging with your assigned trainer</p>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <h3>Why Join Us?</h3>
        <div className="stats-grid">
          <div className="stat">
            <h4>500+</h4>
            <p>Active Members</p>
          </div>
          <div className="stat">
            <h4>50+</h4>
            <p>Professional Trainers</p>
          </div>
          <div className="stat">
            <h4>100%</h4>
            <p>Satisfaction Rate</p>
          </div>
        </div>
      </section>
    </div>
  );
}

// Member Login Component
function MemberLoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would authenticate with the backend
    if (email && password) {
      // Simulate login - in production, validate with API
      onLogin(1); // Pass member ID
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Member Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p>Don't have an account? <Link to="/member-registration">Register here</Link></p>
      </div>
    </div>
  );
}

// Trainer Login Component
function TrainerLoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      // Simulate login - in production, validate with API
      onLogin(1); // Pass trainer ID
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Trainer Login</h2>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>

        <p>Don't have an account? <Link to="/trainer-registration">Register here</Link></p>
      </div>
    </div>
  );
}

export default App;
