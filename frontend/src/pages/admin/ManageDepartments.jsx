import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Building2 } from 'lucide-react';

const ManageDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/departments').then(res => setDepartments(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Departments</h1>
          <p className="page-subtitle">Clinical departments in this facility</p>
        </div>
      </div>
      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {departments.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Building2 size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No departments found.</p>
            </div>
          ) : (
            <div className="stats-grid">
              {departments.map(d => (
                <div key={d.id} className="card" style={{ textAlign: 'center' }}>
                  <div style={{ width: '52px', height: '52px', background: '#e0f2fe', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem', color: '#0284c7' }}>
                    <Building2 size={24} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '1rem' }}>{d.name}</p>
                  {d.description && <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>{d.description}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageDepartments;
