import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { ClipboardList } from 'lucide-react';

const StaffTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = () => {
    api.get('/staff-tasks/my')
      .then(res => setTasks(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTasks(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/staff-tasks/${id}/status`, { status });
      fetchTasks();
    } catch { alert('Failed to update task'); }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Tasks</h1>
          <p className="page-subtitle">Tasks assigned to you</p>
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {tasks.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <ClipboardList size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No tasks assigned to you.</p>
            </div>
          ) : tasks.map(task => (
            <div key={task.id} className="card" style={{ borderLeft: `4px solid ${task.priority === 'HIGH' ? '#ef4444' : task.priority === 'MEDIUM' ? '#f59e0b' : '#10b981'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 700, fontSize: '1rem' }}>{task.title}</p>
                  {task.description && <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>{task.description}</p>}
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                    <StatusBadge status={task.status} />
                    {task.priority && <StatusBadge status={task.priority} />}
                  </div>
                  {task.dueDate && <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.35rem' }}>Due: {task.dueDate}</p>}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {task.status === 'PENDING' && (
                    <button className="btn btn-primary btn-sm" onClick={() => updateStatus(task.id, 'IN_PROGRESS')}>Start</button>
                  )}
                  {task.status === 'IN_PROGRESS' && (
                    <button className="btn btn-success btn-sm" onClick={() => updateStatus(task.id, 'COMPLETED')}>Complete</button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StaffTasks;
