import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import { Calendar, Clock, FileText, Pill, Bell, User, Activity } from 'lucide-react';
import StatusBadge from '../../components/StatusBadge';

const PatientDashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [queue, setQueue] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [apptRes, queueRes, notifRes] = await Promise.allSettled([
          api.get('/appointments/my'),
          api.get('/queue/my'),
          api.get('/notifications'),
        ]);
        if (apptRes.status === 'fulfilled') setAppointments(apptRes.value.data);
        if (queueRes.status === 'fulfilled') setQueue(queueRes.value.data);
        if (notifRes.status === 'fulfilled') setNotifications(notifRes.value.data);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const upcomingAppts = appointments.filter(a => a.status === 'BOOKED' || a.status === 'CHECKED_IN').slice(0, 3);
  const activeQueue = queue.filter(q => q.status === 'WAITING' || q.status === 'IN_PROGRESS');
  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (loading) return <div className="page-container" style={{ textAlign: 'center', color: '#94a3b8', paddingTop: '4rem' }}>Loading dashboard...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="page-subtitle">Your personal health dashboard</p>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0284c7' }}><Calendar size={22} /></div>
          <div>
            <p className="stat-value">{appointments.length}</p>
            <p className="stat-label">Total Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}><Clock size={22} /></div>
          <div>
            <p className="stat-value">{upcomingAppts.length}</p>
            <p className="stat-label">Upcoming</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#6366f1' }}><Activity size={22} /></div>
          <div>
            <p className="stat-value">{activeQueue.length}</p>
            <p className="stat-label">In Queue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}><Bell size={22} /></div>
          <div>
            <p className="stat-value">{unreadCount}</p>
            <p className="stat-label">Unread Notifications</p>
          </div>
        </div>
      </div>

      {/* Active Queue Tickets */}
      {activeQueue.length > 0 && (
        <div className="card" style={{ borderLeft: '4px solid #6366f1' }}>
          <h3 className="card-title"><Activity size={18} />Active Queue Tickets</h3>
          {activeQueue.map(entry => (
            <div key={entry.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: '#f0f9ff', borderRadius: '8px', marginBottom: '0.5rem' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#4338ca' }}>Ticket #{entry.queueNumber}</p>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Dr. {entry.doctorName}</p>
              </div>
              <StatusBadge status={entry.status} />
            </div>
          ))}
        </div>
      )}

      {/* Upcoming Appointments */}
      <div className="card">
        <h3 className="card-title"><Calendar size={18} />Upcoming Appointments</h3>
        {upcomingAppts.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No upcoming appointments. <a href="/patient/book">Book one now →</a></p>
        ) : (
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Date</th><th>Time</th><th>Doctor</th><th>Status</th></tr></thead>
              <tbody>
                {upcomingAppts.map(a => (
                  <tr key={a.id}>
                    <td>{a.appointmentDate}</td>
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

      {/* Recent Notifications */}
      <div className="card">
        <h3 className="card-title"><Bell size={18} />Recent Notifications</h3>
        {notifications.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>No notifications.</p>
        ) : (
          notifications.slice(0, 4).map(n => (
            <div key={n.id} style={{ padding: '0.65rem 0.75rem', borderRadius: '6px', background: n.isRead ? '#f8fafc' : '#f0f9ff', marginBottom: '0.5rem', borderLeft: n.isRead ? '3px solid #e2e8f0' : '3px solid #0284c7' }}>
              <p style={{ fontWeight: 700, fontSize: '0.875rem' }}>{n.title}</p>
              <p style={{ color: '#475569', fontSize: '0.8rem' }}>{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PatientDashboard;
