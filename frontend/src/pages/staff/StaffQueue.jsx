import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Clock, RefreshCw } from 'lucide-react';

const StaffQueue = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/doctors').then(res => setDoctors(res.data)).catch(() => {});
  }, []);

  const fetchQueue = async (doctorId) => {
    if (!doctorId) return;
    setLoading(true);
    try {
      const res = await api.get(`/queue/doctor/${doctorId}`);
      setQueue(res.data);
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);
    fetchQueue(e.target.value);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/queue/${id}/status`, { status });
      fetchQueue(selectedDoctor);
    } catch { alert('Failed to update.'); }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Queue Control</h1>
          <p className="page-subtitle">Monitor and manage patient queues by doctor</p>
        </div>
        <button className="btn btn-secondary" onClick={() => fetchQueue(selectedDoctor)}><RefreshCw size={16} /> Refresh</button>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Select Doctor</label>
          <select className="form-select" value={selectedDoctor} onChange={handleDoctorChange}>
            <option value="">Choose a doctor...</option>
            {doctors.map(d => <option key={d.id} value={d.id}>Dr. {d.name} — {d.specialization}</option>)}
          </select>
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading queue...</p> : selectedDoctor && (
        <div>
          {queue.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
              <Clock size={40} style={{ color: '#94a3b8', marginBottom: '0.75rem' }} />
              <p style={{ color: '#64748b' }}>Queue is empty for this doctor.</p>
            </div>
          ) : queue.map(entry => (
            <div key={entry.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.25rem', color: '#4338ca' }}>#{entry.queueNumber}</p>
                <p style={{ fontWeight: 600 }}>{entry.patientName}</p>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <StatusBadge status={entry.priority} />
                  <StatusBadge status={entry.status} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {entry.status === 'WAITING' && (
                  <button className="btn btn-primary btn-sm" onClick={() => updateStatus(entry.id, 'IN_PROGRESS')}>Start</button>
                )}
                {entry.status === 'IN_PROGRESS' && (
                  <button className="btn btn-success btn-sm" onClick={() => updateStatus(entry.id, 'COMPLETED')}>Complete</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffQueue;
