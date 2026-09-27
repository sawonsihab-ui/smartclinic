import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Calendar } from 'lucide-react';

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/appointments').then(res => setAppointments(res.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">All Appointments</h1>
          <p className="page-subtitle">Clinic-wide appointment records</p>
        </div>
      </div>
      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div className="card">
          <div className="table-responsive">
            <table className="custom-table">
              <thead><tr><th>Date</th><th>Time</th><th>Patient</th><th>Doctor</th><th>Status</th></tr></thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id}>
                    <td>{a.appointmentDate}</td>
                    <td>{a.startTime}</td>
                    <td>{a.patientName}</td>
                    <td>Dr. {a.doctorName}</td>
                    <td><StatusBadge status={a.status} /></td>
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

export default AllAppointments;
