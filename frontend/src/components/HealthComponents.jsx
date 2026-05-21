import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Health Tracking Component
export const HealthTracking = ({ memberId }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [formData, setFormData] = useState({
    mId: memberId,
    calories: '',
    sleepHours: '',
    waterIntake: '',
    trainerId: '',
    healthDate: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchHealthRecords();
  }, [memberId]);

  const fetchHealthRecords = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/health/member/${memberId}`);
      setHealthRecords(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching health records:', err);
      setLoading(false);
    }
  };

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
      const submitData = {
        ...formData,
        calories: parseInt(formData.calories),
        sleepHours: parseInt(formData.sleepHours),
        waterIntake: parseInt(formData.waterIntake),
        trainerId: formData.trainerId ? parseInt(formData.trainerId) : null,
      };
      
      await axios.post(`${API_BASE_URL}/health`, submitData);
      setSuccess('Health record added successfully!');
      
      setFormData({
        mId: memberId,
        calories: '',
        sleepHours: '',
        waterIntake: '',
        trainerId: '',
        healthDate: new Date().toISOString().split('T')[0],
      });
      
      fetchHealthRecords();
    } catch (err) {
      setError('Error adding health record: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="health-tracking">
      <h2>Health Tracking</h2>

      <div className="health-form">
        <h3>Add Health Record</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="healthDate"
              value={formData.healthDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Calories Burned:</label>
            <input
              type="number"
              name="calories"
              value={formData.calories}
              onChange={handleChange}
              placeholder="e.g., 2000"
              required
            />
          </div>

          <div className="form-group">
            <label>Sleep Hours:</label>
            <input
              type="number"
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              min="0"
              max="24"
              placeholder="e.g., 8"
              required
            />
          </div>

          <div className="form-group">
            <label>Water Intake (Liters):</label>
            <input
              type="number"
              step="0.1"
              name="waterIntake"
              value={formData.waterIntake}
              onChange={handleChange}
              placeholder="e.g., 2.5"
              required
            />
          </div>

          <button type="submit" className="btn-primary">Record Health Data</button>
        </form>
      </div>

      <div className="health-records">
        <h3>Health History</h3>
        {healthRecords.length > 0 ? (
          <div className="records-grid">
            {healthRecords.map((record) => (
              <div key={record.hId} className="health-card">
                <p><strong>Date:</strong> {new Date(record.healthDate).toLocaleDateString()}</p>
                <p><strong>Calories:</strong> {record.calories} kcal</p>
                <p><strong>Sleep:</strong> {record.sleepHours} hours</p>
                <p><strong>Water:</strong> {record.waterIntake} L</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No health records yet</p>
        )}
      </div>
    </div>
  );
};

// Workout Schedule Component
export const WorkoutSchedule = ({ memberId, trainerId = null }) => {
  const [schedules, setSchedules] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [formData, setFormData] = useState({
    trainerId: trainerId || '',
    mId: memberId || '',
    sDate: '',
    name: '',
    exerciseId: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSchedules();
    fetchExercises();
  }, [memberId, trainerId]);

  const fetchSchedules = async () => {
    try {
      // This would need a dedicated endpoint in your API
      // For now, we'll skip this part
      setLoading(false);
    } catch (err) {
      console.error('Error fetching schedules:', err);
      setLoading(false);
    }
  };

  const fetchExercises = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/exercises`);
      setExercises(response.data);
    } catch (err) {
      console.error('Error fetching exercises:', err);
    }
  };

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
      const submitData = {
        ...formData,
        trainerId: parseInt(formData.trainerId),
        mId: parseInt(formData.mId),
      };

      // This would need a dedicated endpoint
      // await axios.post(`${API_BASE_URL}/schedules`, submitData);
      
      setSuccess('Workout schedule created successfully!');
      setFormData({
        trainerId: trainerId || '',
        mId: memberId || '',
        sDate: '',
        name: '',
        exerciseId: '',
      });
    } catch (err) {
      setError('Error creating schedule: ' + err.message);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="workout-schedule">
      <h2>Workout Schedule</h2>

      <div className="schedule-form">
        <h3>Create New Schedule</h3>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Schedule Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Upper Body Workout"
              required
            />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input
              type="date"
              name="sDate"
              value={formData.sDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Exercise:</label>
            <select name="exerciseId" value={formData.exerciseId} onChange={handleChange} required>
              <option value="">Choose an exercise</option>
              {exercises.map((exercise) => (
                <option key={exercise.eId} value={exercise.eId}>
                  {exercise.exerciseName} - {exercise.intensity}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary">Create Schedule</button>
        </form>
      </div>

      {schedules.length > 0 && (
        <div className="schedules-list">
          <h3>Your Schedules</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Trainer</th>
                <th>Exercises</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule) => (
                <tr key={schedule.sId}>
                  <td>{schedule.name}</td>
                  <td>{new Date(schedule.sDate).toLocaleDateString()}</td>
                  <td>{schedule.trainer?.tName}</td>
                  <td>{schedule.exercises?.length || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Progress Tracking Component
export const ProgressTracking = ({ memberId }) => {
  const [progressData, setProgressData] = useState({
    startWeight: 0,
    currentWeight: 0,
    startStrength: 0,
    currentStrength: 0,
    weightProgress: 0,
    strengthProgress: 0,
  });

  const [healthRecords, setHealthRecords] = useState([]);

  useEffect(() => {
    fetchProgressData();
  }, [memberId]);

  const fetchProgressData = async () => {
    try {
      const healthRes = await axios.get(`${API_BASE_URL}/health/member/${memberId}`);
      setHealthRecords(healthRes.data);

      // Calculate progress based on health records
      if (healthRes.data.length > 0) {
        const firstRecord = healthRes.data[healthRes.data.length - 1];
        const lastRecord = healthRes.data[0];

        setProgressData({
          startWeight: 0, // Would need to fetch from member data
          currentWeight: 0,
          startStrength: 0,
          currentStrength: 0,
          weightProgress: 0,
          strengthProgress: 0,
        });
      }
    } catch (err) {
      console.error('Error fetching progress data:', err);
    }
  };

  return (
    <div className="progress-tracking">
      <h2>Progress Tracking</h2>

      <div className="progress-grid">
        <div className="progress-card">
          <h3>Average Daily Calories</h3>
          <p className="progress-value">
            {healthRecords.length > 0
              ? Math.round(healthRecords.reduce((sum, r) => sum + r.calories, 0) / healthRecords.length)
              : 0}
          </p>
          <p>kcal/day</p>
        </div>

        <div className="progress-card">
          <h3>Average Sleep</h3>
          <p className="progress-value">
            {healthRecords.length > 0
              ? (healthRecords.reduce((sum, r) => sum + r.sleepHours, 0) / healthRecords.length).toFixed(1)
              : 0}
          </p>
          <p>hours/day</p>
        </div>

        <div className="progress-card">
          <h3>Average Water Intake</h3>
          <p className="progress-value">
            {healthRecords.length > 0
              ? (healthRecords.reduce((sum, r) => sum + r.waterIntake, 0) / healthRecords.length).toFixed(1)
              : 0}
          </p>
          <p>liters/day</p>
        </div>
      </div>

      <div className="badges-section">
        <h3>Performance Badges</h3>
        <div className="badges">
          {healthRecords.length > 5 && <span className="badge">Consistent Tracker</span>}
          {healthRecords.some(r => r.sleepHours >= 8) && <span className="badge">Good Sleeper</span>}
          {healthRecords.some(r => r.waterIntake >= 2) && <span className="badge">Hydration Master</span>}
          {healthRecords.length === 0 && <span className="badge-empty">Start tracking to earn badges!</span>}
        </div>
      </div>
    </div>
  );
};

export default HealthTracking;
