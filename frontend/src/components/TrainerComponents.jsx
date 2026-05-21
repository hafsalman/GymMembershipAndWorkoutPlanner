import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Trainer Dashboard Component
export const TrainerDashboard = ({ trainerId }) => {
  const [trainer, setTrainer] = useState(null);
  const [members, setMembers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrainerData();
  }, [trainerId]);

  const fetchTrainerData = async () => {
    try {
      const trainerRes = await axios.get(`${API_BASE_URL}/trainers/${trainerId}`);
      setTrainer(trainerRes.data);
      setMembers(trainerRes.data.members);

      const appointmentsRes = await axios.get(`${API_BASE_URL}/appointments`);
      const trainerAppointments = appointmentsRes.data.filter(a => a.trainerId === trainerId);
      setAppointments(trainerAppointments);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching trainer data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="trainer-dashboard">
      <h1>Welcome, {trainer?.tName}</h1>

      <div className="dashboard-grid">
        {/* Trainer Info */}
        <div className="card">
          <h2>Profile Information</h2>
          <p><strong>Email:</strong> {trainer?.email}</p>
          <p><strong>Phone:</strong> {trainer?.phone}</p>
          <p><strong>Specialization:</strong> {trainer?.specialization}</p>
          <p><strong>Salary:</strong> ${trainer?.salary}</p>
          <p><strong>Members Assigned:</strong> {members.length}</p>
        </div>

        {/* Assigned Members */}
        <div className="card">
          <h2>Assigned Members ({members.length})</h2>
          {members.length > 0 ? (
            <ul>
              {members.map((member) => (
                <li key={member.memberId}>
                  <p><strong>{member.mName}</strong></p>
                  <p>Goal: {member.fitnessGoal}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No members assigned</p>
          )}
        </div>

        {/* Today's Appointments */}
        <div className="card">
          <h2>Today's Appointments</h2>
          {appointments.length > 0 ? (
            <ul>
              {appointments.slice(0, 5).map((apt) => (
                <li key={apt.aId}>
                  <p><strong>Member:</strong> {apt.member?.mName}</p>
                  <p><strong>Time:</strong> {apt.aTime}</p>
                  <p><strong>Status:</strong> {apt.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments today</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Trainer Registration Component
export const TrainerRegistration = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    tName: '',
    tDescription: '',
    email: '',
    phone: '',
    joinDateTime: new Date().toISOString().split('T')[0],
    salary: '',
    password: '',
    specialization: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/trainers`, formData);
      setSuccess('Trainer registered successfully!');
      setFormData({
        tName: '',
        tDescription: '',
        email: '',
        phone: '',
        joinDateTime: new Date().toISOString().split('T')[0],
        salary: '',
        password: '',
        specialization: '',
      });
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setError('Error registering trainer: ' + err.message);
    }
  };

  return (
    <div className="trainer-registration">
      <h2>Trainer Registration</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="tName"
            value={formData.tName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="tDescription"
            value={formData.tDescription}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Specialization:</label>
          <select name="specialization" value={formData.specialization} onChange={handleChange} required>
            <option value="">Select Specialization</option>
            <option value="Strength Training">Strength Training</option>
            <option value="Cardio">Cardio</option>
            <option value="Flexibility">Flexibility</option>
            <option value="Mixed">Mixed</option>
          </select>
        </div>

        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            step="0.01"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Register Trainer</button>
      </form>
    </div>
  );
};

// Appointment Booking Component
export const AppointmentBooking = ({ memberId, onSuccess }) => {
  const [formData, setFormData] = useState({
    memberId: memberId,
    trainerId: '',
    aDate: '',
    aTime: '',
    status: 'Scheduled',
  });

  const [trainers, setTrainers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trainers`);
      setTrainers(response.data);
    } catch (err) {
      console.error('Error fetching trainers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === '' ? '' : (name === 'trainerId' ? parseInt(value) : value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/appointments`, formData);
      setSuccess('Appointment booked successfully!');
      setFormData({
        memberId: memberId,
        trainerId: '',
        aDate: '',
        aTime: '',
        status: 'Scheduled',
      });
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setError('Error booking appointment: ' + err.message);
    }
  };

  return (
    <div className="appointment-booking">
      <h2>Book an Appointment</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Trainer:</label>
          <select name="trainerId" value={formData.trainerId} onChange={handleChange} required>
            <option value="">Choose a trainer</option>
            {trainers.map((trainer) => (
              <option key={trainer.trainerId} value={trainer.trainerId}>
                {trainer.tName} - {trainer.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="aDate"
            value={formData.aDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            name="aTime"
            value={formData.aTime}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">Book Appointment</button>
      </form>
    </div>
  );
};

// Appointments List Component
export const AppointmentsList = ({ trainerId = null, memberId = null }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [trainerId, memberId]);

  const fetchAppointments = async () => {
    try {
      let url = `${API_BASE_URL}/appointments`;
      if (memberId) {
        url = `${API_BASE_URL}/appointments/member/${memberId}`;
      }
      const response = await axios.get(url);
      let data = response.data;
      
      if (trainerId) {
        data = data.filter(a => a.trainerId === trainerId);
      }
      
      setAppointments(data.sort((a, b) => new Date(b.aDate) - new Date(a.aDate)));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="appointments-list">
      <h2>Appointments</h2>
      {appointments.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Trainer</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => (
              <tr key={apt.aId}>
                <td>{apt.member?.mName}</td>
                <td>{apt.trainer?.tName}</td>
                <td>{new Date(apt.aDate).toLocaleDateString()}</td>
                <td>{apt.aTime}</td>
                <td>
                  <span className={`status-${apt.status.toLowerCase()}`}>
                    {apt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found</p>
      )}
    </div>
  );
};

export default TrainerDashboard;
