import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { CheckCircle, Activity, ClipboardList } from 'lucide-react';

const NurseDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get('/appointments'),
      api.get('/staff-tasks/my'),
    ]).then(([apptRes, taskRes]) => {
      if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data);
      if (taskRes.status === 'fulfilled') setTasks(taskRes.value.data);
    }).finally(() => setLoading(false));
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayBooked = appointments.filter(a => a.appointmentDate === today && a.status === 'BOOKED');
  const pendingTasks = tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS');

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Nurse Dashboard</h1>
          <p className="page-subtitle">Patient check-in and care coordination</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0284c7' }}><CheckCircle size={22} /></div>
          <div><p className="stat-value">{todayBooked.length}</p><p className="stat-label">Awaiting Check-in</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}><Activity size={22} /></div>
          <div><p className="stat-value">{appointments.filter(a => a.status === 'CHECKED_IN').length}</p><p className="stat-label">Checked In Today</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}><ClipboardList size={22} /></div>
          <div><p className="stat-value">{pendingTasks.length}</p><p className="stat-label">Pending Tasks</p></div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><CheckCircle size={18} />Today's Patients Awaiting Check-in</h3>
        {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : todayBooked.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No patients awaiting check-in.</p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Patient</th><th>Time</th><th>Doctor</th><th>Status</th></tr></thead>
              <tbody>
                {todayBooked.map(a => (
                  <tr key={a.id}>
                    <td style={{ fontWeight: 600 }}>{a.patientName}</td>
                    <td>{a.startTime}</td>
                    <td>Dr. {a.doctorName}</td>
                    <td><StatusBadge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NurseDashboard;
