import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CheckCircle, AlertCircle } from 'lucide-react';

const CheckInPatient = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({ appointmentId: '', priority: 'NORMAL' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/appointments').then(res => {
      // Only show BOOKED appointments for today
      const today = new Date().toISOString().split('T')[0];
      const eligible = res.data.filter(a => a.status === 'BOOKED' && a.appointmentDate === today);
      setAppointments(eligible);
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      const res = await api.post('/queue/check-in', {
        appointmentId: parseInt(form.appointmentId),
        priority: form.priority,
      });
      setSuccess(`Patient checked in! Queue Ticket #${res.data.queueNumber} assigned.`);
      setForm({ appointmentId: '', priority: 'NORMAL' });
      // Refresh appointment list
      const today = new Date().toISOString().split('T')[0];
      const apptRes = await api.get('/appointments');
      setAppointments(apptRes.data.filter(a => a.status === 'BOOKED' && a.appointmentDate === today));
    } catch (err) {
      setError(err.response?.data?.message || 'Check-in failed. Patient may already be checked in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Check-In Patient</h1>
          <p className="page-subtitle">Register patient arrival and assign queue ticket</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '500px' }}>
        {error && (
          <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={18} /><span>{error}</span>
          </div>
        )}
        {success && (
          <div style={{ backgroundColor: '#d1fae5', color: '#047857', padding: '0.75rem 1rem', borderRadius: '8px', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} /><span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Today's Appointment *</label>
            <select className="form-select" required value={form.appointmentId} onChange={e => setForm({ ...form, appointmentId: e.target.value })}>
              <option value="">Choose appointment...</option>
              {appointments.map(a => (
                <option key={a.id} value={a.id}>
                  {a.patientName} — Dr. {a.doctorName} @ {a.startTime}
                </option>
              ))}
            </select>
            {appointments.length === 0 && <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem' }}>No eligible appointments for today.</p>}
          </div>

          <div className="form-group">
            <label className="form-label">Priority Level</label>
            <select className="form-select" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
              <option value="NORMAL">Normal</option>
              <option value="URGENT">Urgent</option>
              <option value="EMERGENCY">Emergency</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={loading}>
            <CheckCircle size={18} /> {loading ? 'Processing...' : 'Check In Patient'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckInPatient;
