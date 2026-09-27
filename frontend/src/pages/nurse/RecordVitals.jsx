import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const RecordVitals = () => {
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState({
    appointmentId: '', bloodPressure: '', heartRate: '', temperature: '',
    oxygenSaturation: '', weight: '', height: '', notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/appointments').then(res => {
      const eligible = res.data.filter(a => a.status === 'CHECKED_IN');
      setAppointments(eligible);
    }).catch(() => {});
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    setLoading(true);
    try {
      await api.post('/vitals', {
        appointmentId: parseInt(form.appointmentId),
        bloodPressure: form.bloodPressure || null,
        heartRate: form.heartRate ? parseInt(form.heartRate) : null,
        temperature: form.temperature ? parseFloat(form.temperature) : null,
        oxygenSaturation: form.oxygenSaturation ? parseFloat(form.oxygenSaturation) : null,
        weight: form.weight ? parseFloat(form.weight) : null,
        height: form.height ? parseFloat(form.height) : null,
        notes: form.notes || null,
      });
      setSuccess('Vitals recorded successfully!');
      setForm({ appointmentId: '', bloodPressure: '', heartRate: '', temperature: '', oxygenSaturation: '', weight: '', height: '', notes: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to record vitals.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Record Vitals</h1>
          <p className="page-subtitle">Log patient vitals for checked-in appointments</p>
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
            <label className="form-label">Patient Appointment *</label>
            <select name="appointmentId" className="form-select" required value={form.appointmentId} onChange={handleChange}>
              <option value="">Select checked-in patient...</option>
              {appointments.map(a => (
                <option key={a.id} value={a.id}>{a.patientName} — Dr. {a.doctorName} @ {a.startTime}</option>
              ))}
            </select>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Blood Pressure</label>
              <input name="bloodPressure" className="form-input" value={form.bloodPressure} onChange={handleChange} placeholder="e.g. 120/80" />
            </div>
            <div className="form-group">
              <label className="form-label">Heart Rate (bpm)</label>
              <input name="heartRate" type="number" className="form-input" value={form.heartRate} onChange={handleChange} placeholder="72" />
            </div>
            <div className="form-group">
              <label className="form-label">Temperature (°C)</label>
              <input name="temperature" type="number" step="0.1" className="form-input" value={form.temperature} onChange={handleChange} placeholder="36.6" />
            </div>
            <div className="form-group">
              <label className="form-label">SpO₂ (%)</label>
              <input name="oxygenSaturation" type="number" step="0.1" className="form-input" value={form.oxygenSaturation} onChange={handleChange} placeholder="98" />
            </div>
            <div className="form-group">
              <label className="form-label">Weight (kg)</label>
              <input name="weight" type="number" step="0.1" className="form-input" value={form.weight} onChange={handleChange} placeholder="70" />
            </div>
            <div className="form-group">
              <label className="form-label">Height (cm)</label>
              <input name="height" type="number" step="0.1" className="form-input" value={form.height} onChange={handleChange} placeholder="170" />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Nurse Notes</label>
            <textarea name="notes" className="form-textarea" rows={2} value={form.notes} onChange={handleChange} placeholder="Any observations..." />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }} disabled={loading}>
            <Activity size={18} /> {loading ? 'Saving...' : 'Record Vitals'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RecordVitals;
