import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { LayoutDashboard, Users, Calendar, Clock, ClipboardList } from 'lucide-react';

const StaffDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.get('/appointments'),
      api.get('/patients'),
      api.get('/staff-tasks/my'),
    ]).then(([apptRes, patRes, taskRes]) => {
      if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data);
      if (patRes.status === 'fulfilled') setPatients(patRes.value.data);
      if (taskRes.status === 'fulfilled') setTasks(taskRes.value.data);
    }).finally(() => setLoading(false));
  }, []);

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter(a => a.appointmentDate === today);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Staff Dashboard</h1>
          <p className="page-subtitle">Clinic operations overview</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0284c7' }}><Calendar size={22} /></div>
          <div><p className="stat-value">{todayAppts.length}</p><p className="stat-label">Today's Appointments</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}><Users size={22} /></div>
          <div><p className="stat-value">{patients.length}</p><p className="stat-label">Registered Patients</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#6366f1' }}><Clock size={22} /></div>
          <div><p className="stat-value">{appointments.filter(a => a.status === 'CHECKED_IN').length}</p><p className="stat-label">Currently Checked In</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}><ClipboardList size={22} /></div>
          <div><p className="stat-value">{tasks.filter(t => t.status !== 'COMPLETED').length}</p><p className="stat-label">Pending Tasks</p></div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title"><Calendar size={18} />Today's Appointments</h3>
        {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : todayAppts.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No appointments today.</p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Time</th><th>Patient</th><th>Doctor</th><th>Status</th></tr></thead>
              <tbody>
                {todayAppts.map(a => (
                  <tr key={a.id}>
                    <td>{a.startTime}</td>
                    <td>{a.patientName}</td>
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

export default StaffDashboard;
