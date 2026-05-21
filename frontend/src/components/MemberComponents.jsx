import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Member Dashboard Component
export const MemberDashboard = ({ memberId }) => {
  const [member, setMember] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [healthRecords, setHealthRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemberData();
  }, [memberId]);

  const fetchMemberData = async () => {
    try {
      const memberRes = await axios.get(`${API_BASE_URL}/members/${memberId}`);
      setMember(memberRes.data);

      const appointmentsRes = await axios.get(`${API_BASE_URL}/appointments/member/${memberId}`);
      setAppointments(appointmentsRes.data);

      const healthRes = await axios.get(`${API_BASE_URL}/health/member/${memberId}`);
      setHealthRecords(healthRes.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching member data:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="member-dashboard">
      <h1>Welcome, {member?.mName}</h1>
      
      <div className="dashboard-grid">
        {/* Member Info Section */}
        <div className="card">
          <h2>Member Information</h2>
          <p><strong>Email:</strong> {member?.email}</p>
          <p><strong>Phone:</strong> {member?.phone}</p>
          <p><strong>Age:</strong> {member?.age}</p>
          <p><strong>Height:</strong> {member?.height} cm</p>
          <p><strong>Weight:</strong> {member?.weight} kg</p>
          <p><strong>Fitness Goal:</strong> {member?.fitnessGoal}</p>
        </div>

        {/* Upcoming Appointments */}
        <div className="card">
          <h2>Upcoming Appointments</h2>
          {appointments.length > 0 ? (
            <ul>
              {appointments.slice(0, 5).map((apt) => (
                <li key={apt.aId}>
                  <p><strong>Trainer:</strong> {apt.trainer?.tName}</p>
                  <p><strong>Date:</strong> {new Date(apt.aDate).toLocaleDateString()}</p>
                  <p><strong>Time:</strong> {apt.aTime}</p>
                  <p><strong>Status:</strong> {apt.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments scheduled</p>
          )}
        </div>

        {/* Health Tracking */}
        <div className="card">
          <h2>Latest Health Record</h2>
          {healthRecords.length > 0 ? (
            <>
              <p><strong>Calories:</strong> {healthRecords[0].calories}</p>
              <p><strong>Sleep Hours:</strong> {healthRecords[0].sleepHours}</p>
              <p><strong>Water Intake:</strong> {healthRecords[0].waterIntake} L</p>
              <p><strong>Date:</strong> {new Date(healthRecords[0].healthDate).toLocaleDateString()}</p>
            </>
          ) : (
            <p>No health records yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Member Registration Component
export const MemberRegistration = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    mName: '',
    age: '',
    gender: '',
    username: '',
    dob: '',
    email: '',
    phone: '',
    height: '',
    weight: '',
    fitnessGoal: '',
    password: '',
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
      const response = await axios.post(`${API_BASE_URL}/members`, formData);
      setSuccess('Member registered successfully!');
      setFormData({
        mName: '',
        age: '',
        gender: '',
        username: '',
        dob: '',
        email: '',
        phone: '',
        height: '',
        weight: '',
        fitnessGoal: '',
        password: '',
      });
      if (onSuccess) onSuccess(response.data);
    } catch (err) {
      setError('Error registering member: ' + err.message);
    }
  };

  return (
    <div className="member-registration">
      <h2>Member Registration</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="mName"
            value={formData.mName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
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
          <label>Height (cm):</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            step="0.1"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Fitness Goal:</label>
          <textarea
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
            required
          ></textarea>
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

        <button type="submit" className="btn-primary">Register</button>
      </form>
    </div>
  );
};

// Members List Component
export const MembersList = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/members`);
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="members-list">
      <h2>Members</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Trainer</th>
            <th>Join Date</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.memberId}>
              <td>{member.mName}</td>
              <td>{member.email}</td>
              <td>{member.phone}</td>
              <td>{member.trainer?.tName || 'Unassigned'}</td>
              <td>{new Date(member.joinDateTime).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MemberDashboard;
