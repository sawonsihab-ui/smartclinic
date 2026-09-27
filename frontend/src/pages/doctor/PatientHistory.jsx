import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Users, Search } from 'lucide-react';

const PatientHistory = () => {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/patients')
      .then(res => setPatients(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = patients.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Patient History</h1>
          <p className="page-subtitle">Browse registered patients</p>
        </div>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input type="text" className="form-input" placeholder="Search patients..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem', width: '250px' }} />
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div className="card">
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <Users size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No patients found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr><th>Name</th><th>Email</th><th>DOB</th><th>Gender</th><th>Blood Group</th></tr>
                </thead>
                <tbody>
                  {filtered.map(p => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>{p.email}</td>
                      <td>{p.dateOfBirth || '—'}</td>
                      <td>{p.gender || '—'}</td>
                      <td>{p.bloodGroup || '—'}</td>
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

export default PatientHistory;
