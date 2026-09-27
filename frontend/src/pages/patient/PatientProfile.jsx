import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, Mail, Phone, Shield } from 'lucide-react';

const PatientProfile = () => {
  const { user } = useAuth();

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-subtitle">Your account information</p>
        </div>
      </div>

      <div className="card" style={{ maxWidth: '500px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, #0284c7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.75rem', fontWeight: 800 }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>{user?.name}</h2>
            <span className="badge badge-booked">{user?.role}</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
            <Mail size={18} color="#0284c7" />
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>EMAIL</p>
              <p style={{ fontWeight: 600, color: '#0f172a' }}>{user?.email}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
            <User size={18} color="#10b981" />
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>USER ID</p>
              <p style={{ fontWeight: 600, color: '#0f172a' }}>#{user?.id}</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '8px' }}>
            <Shield size={18} color="#6366f1" />
            <div>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>ROLE</p>
              <p style={{ fontWeight: 600, color: '#0f172a' }}>{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
