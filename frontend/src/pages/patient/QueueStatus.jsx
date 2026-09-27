import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Clock, RefreshCw } from 'lucide-react';

const QueueStatus = () => {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      const res = await api.get('/queue/my');
      setQueue(res.data);
    } catch (err) {
      console.error('Failed to load queue status');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const activeEntries = queue.filter(q => q.status === 'WAITING' || q.status === 'IN_PROGRESS');
  const pastEntries = queue.filter(q => q.status === 'COMPLETED' || q.status === 'CANCELLED');

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Queue Status</h1>
          <p className="page-subtitle">Real-time queue ticket tracking</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchQueue}><RefreshCw size={16} /> Refresh</button>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <>
          {activeEntries.length > 0 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#0f172a' }}>Active Tickets</h3>
              {activeEntries.map(entry => (
                <div key={entry.id} className="card" style={{ borderLeft: `4px solid ${entry.status === 'IN_PROGRESS' ? '#10b981' : '#6366f1'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '3rem', fontWeight: 900, color: '#4338ca', lineHeight: 1 }}>#{entry.queueNumber}</p>
                      <p style={{ fontSize: '1rem', fontWeight: 600, color: '#0f172a', marginTop: '0.25rem' }}>Dr. {entry.doctorName}</p>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Priority: <strong>{entry.priority}</strong></p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <StatusBadge status={entry.status} />
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.5rem' }}>
                        Checked in: {new Date(entry.checkInTime).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {queue.length === 0 && (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Clock size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b', fontSize: '1rem' }}>You are not currently in any queue.</p>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginTop: '0.5rem' }}>Check in at the front desk when you arrive for your appointment.</p>
            </div>
          )}

          {pastEntries.length > 0 && (
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: '1rem', color: '#64748b', marginTop: '1.5rem' }}>Past Visits</h3>
              <div className="card">
                <div className="table-responsive">
                  <table className="custom-table">
                    <thead><tr><th>Ticket #</th><th>Doctor</th><th>Check-in Time</th><th>Status</th></tr></thead>
                    <tbody>
                      {pastEntries.map(entry => (
                        <tr key={entry.id}>
                          <td style={{ fontWeight: 700 }}>#{entry.queueNumber}</td>
                          <td>Dr. {entry.doctorName}</td>
                          <td>{new Date(entry.checkInTime).toLocaleString()}</td>
                          <td><StatusBadge status={entry.status} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QueueStatus;
