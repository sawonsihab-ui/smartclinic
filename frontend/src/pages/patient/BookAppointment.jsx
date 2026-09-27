import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { CalendarPlus, AlertCircle, CheckCircle } from 'lucide-react';

const BookAppointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [slots, setSlots] = useState([]);
  const [form, setForm] = useState({ doctorId: '', appointmentDate: '', startTime: '', reason: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/doctors').then(res => setDoctors(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    if (form.doctorId && form.appointmentDate) {
      api.get(`/doctors/${form.doctorId}/slots?date=${form.appointmentDate}`)
        .then(res => setSlots(res.data))
        .catch(() => setSlots([]));
    } else {
      setSlots([]);
    }
    setForm(prev => ({ ...prev, startTime: '' }));
  }, [form.doctorId, form.appointmentDate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await api.post('/appointments', {
        doctorId: parseInt(form.doctorId),
        appointmentDate: form.appointmentDate,
        startTime: form.startTime,
        reason: form.reason,
      });
      setSuccess('Appointment booked successfully! You will receive a notification shortly.');
      setForm({ doctorId: '', appointmentDate: '', startTime: '', reason: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book appointment. Slot may be taken.');
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Book Appointment</h1>
          <p className="page-subtitle">Schedule a consultation with your doctor</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '600px' }}>
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
            <label className="form-label">Select Doctor *</label>
            <select name="doctorId" className="form-select" required value={form.doctorId} onChange={handleChange}>
              <option value="">Choose a doctor...</option>
              {doctors.map(d => (
                <option key={d.id} value={d.id}>Dr. {d.name} — {d.specialization} ({d.departmentName || 'General'})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Appointment Date *</label>
            <input name="appointmentDate" type="date" className="form-input" required min={today} value={form.appointmentDate} onChange={handleChange} />
          </div>

          {slots.length > 0 && (
            <div className="form-group">
              <label className="form-label">Available Time Slots *</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {slots.map(slot => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setForm({ ...form, startTime: slot })}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      border: '1px solid',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      backgroundColor: form.startTime === slot ? '#0284c7' : '#f1f5f9',
                      color: form.startTime === slot ? 'white' : '#0f172a',
                      borderColor: form.startTime === slot ? '#0284c7' : '#e2e8f0',
                      transition: 'all 0.2s'
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}

          {form.doctorId && form.appointmentDate && slots.length === 0 && (
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>No available slots for this doctor on this date.</p>
          )}

          <div className="form-group">
            <label className="form-label">Reason for Visit</label>
            <textarea name="reason" className="form-textarea" rows={3} value={form.reason} onChange={handleChange} placeholder="Describe your symptoms or reason..." />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={loading || !form.startTime}>
            <CalendarPlus size={18} /> {loading ? 'Booking...' : 'Confirm Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookAppointment;
