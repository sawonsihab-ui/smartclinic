import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Pill, Printer } from 'lucide-react';
import PrescriptionPrintModal from '../../components/PrescriptionPrintModal';

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.get('/prescriptions/my')
      .then(res => setPrescriptions(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Prescriptions</h1>
          <p className="page-subtitle">Digital prescriptions from your consultations</p>
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div>
          {prescriptions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <Pill size={48} style={{ color: '#94a3b8', marginBottom: '1rem' }} />
              <p style={{ color: '#64748b' }}>No prescriptions found.</p>
            </div>
          ) : (
            prescriptions.map(rx => (
              <div key={rx.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>Rx #{rx.id}</p>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>By Dr. {rx.doctorName} — {rx.prescriptionDate}</p>
                    <div style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {rx.items && rx.items.map((item, i) => (
                        <span key={i} style={{ background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.65rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>
                          {item.medicineName} — {item.dosage}
                        </span>
                      ))}
                    </div>
                    {rx.notes && <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.5rem', fontStyle: 'italic' }}>Note: {rx.notes}</p>}
                  </div>
                  <button className="btn btn-secondary btn-sm" onClick={() => setSelected(rx)}>
                    <Printer size={14} /> Print
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <PrescriptionPrintModal isOpen={!!selected} onClose={() => setSelected(null)} prescription={selected} />
    </div>
  );
};

export default MyPrescriptions;
