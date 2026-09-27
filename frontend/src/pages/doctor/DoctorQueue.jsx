import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Clock, RefreshCw, ChevronRight } from 'lucide-react';

const DoctorQueue = () => {
  const { user } = useAuth();
  const [queue, setQueue] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async (dId) => {
    try {
      const res = await api.get(`/queue/doctor/${dId}`);
      setQueue(res.data);
    } catch {}
  };

  useEffect(() => {
    const init = async () => {
      try {
        const docs = await api.get('/doctors');
        const mine = docs.data.find(d => d.userId === user?.id);
        if (mine) {
          setDoctorId(mine.id);
          await fetchQueue(mine.id);
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [user]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/queue/${id}/status`, { status });
      if (doctorId) fetchQueue(doctorId);
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const priorityOrder = { EMERGENCY: 0, URGENT: 1, NORMAL: 2 };
  const sorted = [...queue].sort((a, b) => (priorityOrder[a.priority] ?? 2) - (priorityOrder[b.priority] ?? 2));

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Active Queue</h1>
          <p className="page-subtitle">Manage your patient queue in real-time</p>
        </div>
        <button className="btn btn-secondary" onClick={() => doctorId && fetchQueue(doctorId)}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {sorted.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Clock size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No patients in queue.</p>
            </div>
          ) : (
            sorted.map(entry => (
              <div key={entry.id} className="card" style={{
                borderLeft: `4px solid ${entry.priority === 'EMERGENCY' ? '#ef4444' : entry.priority === 'URGENT' ? '#f97316' : '#0284c7'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontSize: '2rem', fontWeight: 900, color: '#4338ca' }}>#{entry.queueNumber}</p>
                    <p style={{ fontWeight: 700, fontSize: '1rem' }}>{entry.patientName}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                      <StatusBadge status={entry.priority} />
                      <StatusBadge status={entry.status} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {entry.status === 'WAITING' && (
                      <button className="btn btn-primary btn-sm" onClick={() => updateStatus(entry.id, 'IN_PROGRESS')}>
                        <ChevronRight size={14} /> Start
                      </button>
                    )}
                    {entry.status === 'IN_PROGRESS' && (
                      <button className="btn btn-success btn-sm" onClick={() => updateStatus(entry.id, 'COMPLETED')}>
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorQueue;
