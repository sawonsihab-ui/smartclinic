import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Stethoscope } from 'lucide-react';

const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/doctors').then(res => setDoctors(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Doctors</h1>
          <p className="page-subtitle">All registered doctors and their schedules</p>
        </div>
      </div>
      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div className="card">
          {doctors.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <Stethoscope size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No doctors found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead><tr><th>Name</th><th>Specialization</th><th>Department</th><th>License #</th><th>Consultation Fee</th></tr></thead>
                <tbody>
                  {doctors.map(d => (
                    <tr key={d.id}>
                      <td style={{ fontWeight: 600 }}>Dr. {d.name}</td>
                      <td>{d.specialization}</td>
                      <td>{d.departmentName || '—'}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{d.licenseNumber}</td>
                      <td>৳{d.consultationFee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageDoctors;
