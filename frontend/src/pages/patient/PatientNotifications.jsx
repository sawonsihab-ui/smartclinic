import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Bell, CheckCheck } from 'lucide-react';

const PatientNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotifications(); }, []);

  const markRead = async (id) => {
    await api.put(`/notifications/${id}/read`);
    fetchNotifications();
  };

  const markAllRead = async () => {
    const unread = notifications.filter(n => !n.isRead);
    await Promise.all(unread.map(n => api.put(`/notifications/${n.id}/read`)));
    fetchNotifications();
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Notifications</h1>
          <p className="page-subtitle">{unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}</p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={markAllRead}><CheckCheck size={16} /> Mark All Read</button>
        )}
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {notifications.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Bell size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No notifications yet.</p>
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => !n.isRead && markRead(n.id)}
                style={{
                  padding: '1rem 1.25rem',
                  borderRadius: '10px',
                  border: '1px solid',
                  borderColor: n.isRead ? '#e2e8f0' : '#bae6fd',
                  backgroundColor: n.isRead ? '#ffffff' : '#f0f9ff',
                  borderLeft: `4px solid ${n.isRead ? '#e2e8f0' : '#0284c7'}`,
                  marginBottom: '0.75rem',
                  cursor: n.isRead ? 'default' : 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, color: '#0f172a' }}>{n.title}</p>
                    <p style={{ color: '#475569', fontSize: '0.875rem', marginTop: '0.25rem' }}>{n.message}</p>
                  </div>
                  {!n.isRead && <span style={{ background: '#0284c7', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '0.15rem 0.5rem', borderRadius: '9999px' }}>NEW</span>}
                </div>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.5rem' }}>{new Date(n.createdAt).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PatientNotifications;
