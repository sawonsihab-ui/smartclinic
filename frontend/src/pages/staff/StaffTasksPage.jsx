import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { ClipboardList, Plus, X } from 'lucide-react';
import Modal from '../../components/Modal';

const StaffTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', assignedToId: '', priority: 'MEDIUM', dueDate: '' });

  const fetchTasks = () => {
    api.get('/staff-tasks').then(res => setTasks(res.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTasks();
    api.get('/admin/users').then(res => setUsers(res.data.filter(u => u.role === 'NURSE' || u.role === 'STAFF'))).catch(() => {});
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/staff-tasks', { ...form, assignedToId: parseInt(form.assignedToId) });
      setShowModal(false);
      setForm({ title: '', description: '', assignedToId: '', priority: 'MEDIUM', dueDate: '' });
      fetchTasks();
    } catch { alert('Failed to create task.'); }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/staff-tasks/${id}/status`, { status });
      fetchTasks();
    } catch { alert('Failed to update.'); }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Staff Tasks</h1>
          <p className="page-subtitle">Assign and manage staff tasks</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={16} /> New Task</button>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {tasks.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <ClipboardList size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No tasks created yet.</p>
            </div>
          ) : tasks.map(task => (
            <div key={task.id} className="card" style={{ borderLeft: `4px solid ${task.priority === 'HIGH' ? '#ef4444' : task.priority === 'MEDIUM' ? '#f59e0b' : '#10b981'}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontWeight: 700 }}>{task.title}</p>
                  {task.description && <p style={{ fontSize: '0.875rem', color: '#475569', marginTop: '0.25rem' }}>{task.description}</p>}
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>Assigned to: {task.assignedToName || 'Unknown'}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.35rem' }}>
                    <StatusBadge status={task.status} />
                  </div>
                  {task.dueDate && <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.35rem' }}>Due: {task.dueDate}</p>}
                </div>
                {task.status !== 'COMPLETED' && (
                  <button className="btn btn-success btn-sm" onClick={() => updateStatus(task.id, 'COMPLETED')}>Mark Done</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New Task">
        <form onSubmit={handleCreate}>
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input className="form-input" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Task title..." />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>
          <div className="form-group">
            <label className="form-label">Assign To *</label>
            <select className="form-select" required value={form.assignedToId} onChange={e => setForm({ ...form, assignedToId: e.target.value })}>
              <option value="">Select staff...</option>
              {users.map(u => <option key={u.id} value={u.id}>{u.name} ({u.role})</option>)}
            </select>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input type="date" className="form-input" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary"><Plus size={16} /> Create Task</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StaffTasksPage;
