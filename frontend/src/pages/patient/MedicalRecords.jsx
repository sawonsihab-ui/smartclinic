import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { FileText } from 'lucide-react';

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/medical-records/my')
      .then(res => setRecords(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Medical Records</h1>
          <p className="page-subtitle">Your complete health history</p>
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {records.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <FileText size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No medical records on file yet.</p>
            </div>
          ) : (
            records.map(record => (
              <div key={record.id} className="card" style={{ borderLeft: '4px solid #0284c7' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>Dr. {record.doctorName}</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Visit: {record.visitDate}</p>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>#{record.id}</span>
                </div>
                {record.chiefComplaint && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase' }}>Chief Complaint:</strong>
                    <p style={{ fontSize: '0.9rem' }}>{record.chiefComplaint}</p>
                  </div>
                )}
                {record.diagnosis && (
                  <div style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase' }}>Diagnosis:</strong>
                    <p style={{ fontSize: '0.9rem' }}>{record.diagnosis}</p>
                  </div>
                )}
                {record.treatmentPlan && (
                  <div>
                    <strong style={{ fontSize: '0.8rem', color: '#475569', textTransform: 'uppercase' }}>Treatment Plan:</strong>
                    <p style={{ fontSize: '0.9rem' }}>{record.treatmentPlan}</p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MedicalRecords;
