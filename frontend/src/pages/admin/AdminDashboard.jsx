import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Stethoscope, Calendar, Activity, TrendingUp, CheckCircle } from 'lucide-react';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics/dashboard')
      .then(res => setAnalytics(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page-container" style={{ textAlign: 'center', paddingTop: '4rem', color: '#94a3b8' }}>Loading analytics...</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Admin Overview</h1>
          <p className="page-subtitle">SmartClinic+ system-wide analytics</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0284c7' }}><Users size={22} /></div>
          <div>
            <p className="stat-value">{analytics?.totalPatients ?? '—'}</p>
            <p className="stat-label">Total Patients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#0d9488' }}><Stethoscope size={22} /></div>
          <div>
            <p className="stat-value">{analytics?.totalDoctors ?? '—'}</p>
            <p className="stat-label">Active Doctors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#6366f1' }}><Calendar size={22} /></div>
          <div>
            <p className="stat-value">{analytics?.totalAppointments ?? '—'}</p>
            <p className="stat-label">Total Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#10b981' }}><CheckCircle size={22} /></div>
          <div>
            <p className="stat-value">{analytics?.todayAppointments ?? '—'}</p>
            <p className="stat-label">Today's Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#f59e0b' }}><Activity size={22} /></div>
          <div>
            <p className="stat-value">{analytics?.pendingAppointments ?? '—'}</p>
            <p className="stat-label">Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: '#ef4444' }}><TrendingUp size={22} /></div>
          <div>
            <p className="stat-value">{analytics?.completedToday ?? '—'}</p>
            <p className="stat-label">Completed Today</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
