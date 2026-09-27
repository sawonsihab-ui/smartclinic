import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Calendar, X } from 'lucide-react';

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppts = () => {
    api.get('/appointments').then(res => setAppointments(res.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => { fetchAppts(); }, []);

  const handleCancel = async (id) => {
    if (!window.confirm('Cancel this appointment?')) return;
    try {
      await api.delete(`/appointments/${id}`);
      fetchAppts();
    } catch { alert('Failed to cancel.'); }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Appointments</h1>
          <p className="page-subtitle">Manage clinic appointments</p>
        </div>
      </div>
      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div className="card">
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Date</th><th>Time</th><th>Patient</th><th>Doctor</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id}>
                    <td>{a.appointmentDate}</td>
                    <td>{a.startTime}</td>
                    <td>{a.patientName}</td>
                    <td>Dr. {a.doctorName}</td>
                    <td><StatusBadge status={a.status} /></td>
                    <td>
                      {a.status === 'BOOKED' && (
                        <button className="btn btn-danger btn-sm" onClick={() => handleCancel(a.id)}><X size={14} /> Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAppointments;
