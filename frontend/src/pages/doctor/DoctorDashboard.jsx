import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Calendar, Clock, Users, Activity } from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [queue, setQueue] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorInfo = async () => {
      try {
        // Get doctor profile by user context
        const res = await api.get('/doctors');
        const myDoctor = res.data.find(d => d.userId === user?.id);
        if (myDoctor) {
          setDoctorId(myDoctor.id);
          const [apptRes, queueRes] = await Promise.allSettled([
            api.get(`/appointments/doctor/${myDoctor.id}`),
            api.get(`/queue/doctor/${myDoctor.id}`),
          ]);
          if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data);
          if (queueRes.status === 'fulfilled') setQueue(queueRes.value.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDoctorInfo();
  }, [user]);

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter(a => a.appointmentDate === today);
  const activeQueue = queue.filter(q => q.status === 'WAITING' || q.status === 'IN_PROGRESS');

  if (loading) return <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem', color: '#94a3b8' }}>Loading...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctor Dashboard</h1>
          <p className="page-subtitle">Welcome, Dr. {user?.name?.split(' ').slice(1).join(' ') || user?.name}</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0284c7' }}><Calendar size={22} /></div>
          <div><p className="stat-value">{todayAppts.length}</p><p className="stat-label">Today's Appointments</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#6366f1' }}><Clock size={22} /></div>
          <div><p className="stat-value">{activeQueue.length}</p><p className="stat-label">Patients in Queue</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}><Users size={22} /></div>
          <div><p className="stat-value">{appointments.length}</p><p className="stat-label">Total Appointments</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}><Activity size={22} /></div>
          <div>
            <p className="stat-value">{appointments.filter(a => a.status === 'COMPLETED').length}</p>
            <p className="stat-label">Completed</p>
          </div>
        </div>
      </div>

      {/* Active Queue */}
      {activeQueue.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
          <h3 className="card-title"><Clock size={18} />Active Queue</h3>
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Ticket #</th><th>Patient</th><th>Priority</th><th>Status</th></tr></thead>
              <tbody>
                {activeQueue.map(e => (
                  <tr key={e.id}>
                    <td style={{ fontWeight: 700, color: '#4338ca' }}>#{e.queueNumber}</td>
                    <td>{e.patientName}</td>
                    <td><StatusBadge status={e.priority} /></td>
                    <td><StatusBadge status={e.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Today's Appointments */}
      <div className="card">
        <h3 className="card-title"><Calendar size={18} />Today's Schedule</h3>
        {todayAppts.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No appointments today.</p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Time</th><th>Patient</th><th>Reason</th><th>Status</th></tr></thead>
              <tbody>
                {todayAppts.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(a => (
                  <tr key={a.id}>
                    <td>{a.startTime}</td>
                    <td>{a.patientName}</td>
                    <td>{a.reason || '—'}</td>
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

export default DoctorDashboard;
