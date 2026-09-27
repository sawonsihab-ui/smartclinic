import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { TestTube } from 'lucide-react';

const LabResults = () => {
  const [labTests, setLabTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/lab-tests/my')
      .then(res => setLabTests(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Lab Results</h1>
          <p className="page-subtitle">Your laboratory test orders and results</p>
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {labTests.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <TestTube size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No lab tests ordered yet.</p>
            </div>
          ) : (
            labTests.map(test => (
              <div key={test.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>{test.testName}</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Ordered by Dr. {test.doctorName} on {test.orderedDate}</p>
                    {test.testType && <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Type: {test.testType}</p>}
                  </div>
                  <StatusBadge status={test.status} />
                </div>

                {test.result && (
                  <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f0fdf4', borderRadius: '8px', borderLeft: '3px solid #10b981' }}>
                    <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#047857', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Result</p>
                    <p style={{ fontSize: '0.9rem' }}>{test.result.resultSummary}</p>
                    {test.result.fileUrl && (
                      <a href={test.result.fileUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: '#0284c7', marginTop: '0.5rem', display: 'block' }}>
                        📎 Download Report
                      </a>
                    )}
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

export default LabResults;
