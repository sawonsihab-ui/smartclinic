import React from 'react';
import { Printer, X, FileText } from 'lucide-react';
import Modal from './Modal';

const PrescriptionPrintModal = ({ isOpen, onClose, prescription }) => {
  if (!prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Medical Prescription">
      <div className="printable-area">
        <div style={{
          border: '2px solid #0284c7',
          borderRadius: '12px',
          padding: '1.5rem',
          backgroundColor: '#ffffff'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #e2e8f0', pb: '1rem', marginBottom: '1rem' }}>
            <div>
              <h2 style={{ color: '#0284c7', fontSize: '1.5rem', fontWeight: 800 }}>SmartClinic+</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Outpatient Healthcare Management Clinic</p>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#475569' }}>
              <p><strong>Rx #:</strong> #{prescription.id}</p>
              <p><strong>Date:</strong> {prescription.prescriptionDate}</p>
            </div>
          </div>

          {/* Info Section */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px', marginBottom: '1.25rem' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Patient Details</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>{prescription.patientName || 'Patient'}</p>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>ID: #{prescription.patientId}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>Prescribing Physician</p>
              <p style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>Dr. {prescription.doctorName || 'Doctor'}</p>
              <p style={{ fontSize: '0.85rem', color: '#475569' }}>Lic #: {prescription.doctorSpecialization || 'General Practice'}</p>
            </div>
          </div>

          {/* Rx Icon & Table */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0284c7', marginBottom: '0.5rem' }}>Rx</div>
            <table className="custom-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Medicine</th>
                  <th>Dosage</th>
                  <th>Frequency</th>
                  <th>Duration</th>
                  <th>Instructions</th>
                </tr>
              </thead>
              <tbody>
                {prescription.items && prescription.items.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 700 }}>{item.medicineName}</td>
                    <td>{item.dosage}</td>
                    <td>{item.frequency}</td>
                    <td>{item.duration}</td>
                    <td style={{ fontStyle: 'italic', color: '#475569' }}>{item.instructions || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {prescription.notes && (
            <div style={{ marginBottom: '1.5rem', padding: '0.75rem', background: '#fffbe3', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
              <strong>Doctor's Notes:</strong> {prescription.notes}
            </div>
          )}

          {/* Footer Signature */}
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Generated via SmartClinic+ Internal System</p>
            <div style={{ textAlign: 'center' }}>
              <div style={{ borderBottom: '1px solid #0f172a', width: '180px', marginBottom: '0.25rem' }}></div>
              <p style={{ fontSize: '0.85rem', fontWeight: 600 }}>Doctor's Signature</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button className="btn btn-secondary" onClick={onClose}>Close</button>
        <button className="btn btn-primary" onClick={handlePrint}>
          <Printer size={16} /> Print Prescription
        </button>
      </div>
    </Modal>
  );
};

export default PrescriptionPrintModal;
