import React, { useState } from 'react';
import api from '../../services/api';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const [form, setForm] = useState({ date: '', dayOfWeek: '', holiday: 'false', currentAppointments: '', weatherCondition: 'Clear' });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true); setError(''); setPrediction(null);
    try {
      // The API expects snake_case for the python backend, wait, it goes to Java backend which proxies to Python.
      // Map form values to PatientVolumePredictRequest structure
      // day_of_week: 0=Monday, 6=Sunday
      const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const dayOfWeekIndex = days.indexOf(form.dayOfWeek);
      const dateObj = new Date(form.date);
      const month = dateObj.getMonth() + 1; // 1-12
      const hour = new Date().getHours(); // Default to current hour

      const res = await api.post('/analytics/patient-volume', {
        day_of_week: dayOfWeekIndex !== -1 ? dayOfWeekIndex : 0,
        month: month || 1,
        hour: hour
      });
      
      const currentAppts = parseInt(form.currentAppointments) || 0;
      const walkIns = res.data.predicted_patient_count || 0;
      setPrediction({
        predictedWalkIns: walkIns,
        totalExpectedVolume: currentAppts + walkIns
      });
    } catch (err) {
      setError('Failed to fetch prediction.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Predictive AI Analytics</h1>
          <p className="page-subtitle">AI-driven patient volume forecasting</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div className="card">
          <h3 className="card-title"><BarChart3 size={18} /> Run Prediction Model</h3>
          {error && <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}><AlertCircle size={16} />{error}</div>}
          <form onSubmit={handlePredict}>
            <div className="form-group">
              <label className="form-label">Target Date *</label>
              <input type="date" className="form-input" required value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Day of Week *</label>
              <select className="form-select" required value={form.dayOfWeek} onChange={e => setForm({ ...form, dayOfWeek: e.target.value })}>
                <option value="">Select...</option>
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Is Holiday?</label>
                <select className="form-select" value={form.holiday} onChange={e => setForm({ ...form, holiday: e.target.value })}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Current Appts *</label>
                <input type="number" className="form-input" required value={form.currentAppointments} onChange={e => setForm({ ...form, currentAppointments: e.target.value })} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Weather Forecast</label>
              <select className="form-select" value={form.weatherCondition} onChange={e => setForm({ ...form, weatherCondition: e.target.value })}>
                <option value="Clear">Clear / Sunny</option>
                <option value="Cloudy">Cloudy</option>
                <option value="Rain">Rainy</option>
                <option value="Extreme">Extreme Weather</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Running ML Model...' : 'Predict Volume'}
            </button>
          </form>
        </div>

        {prediction && (
          <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
            <h3 className="card-title"><TrendingUp size={18} /> Prediction Results</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem' }}>Based on historical clinic data and input parameters.</p>
            
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <p style={{ fontSize: '4rem', fontWeight: 900, color: '#10b981', lineHeight: 1 }}>{prediction.predictedWalkIns}</p>
              <p style={{ fontWeight: 600, color: '#0f172a' }}>Expected Walk-in Patients</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Expected Volume (Appts + Walk-ins):</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 800 }}>{prediction.totalExpectedVolume} Patients</p>
              
              <div style={{ marginTop: '1rem', height: '100px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ name: 'Pre-booked', value: parseInt(form.currentAppointments) }, { name: 'Walk-ins (Pred)', value: prediction.predictedWalkIns }]}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="value" fill="#0284c7" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
