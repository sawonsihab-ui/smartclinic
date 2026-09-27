import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import StatusBadge from '../../components/StatusBadge';
import { Calendar } from 'lucide-react';

const DoctorAppointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const docs = await api.get('/doctors');
        const mine = docs.data.find(d => d.userId === user?.id);
        if (mine) {
          const res = await api.get(`/appointments/doctor/${mine.id}`);
          setAppointments(res.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Appointments</h1>
          <p className="page-subtitle">All patient appointments in your schedule</p>
        </div>
      </div>

      {loading ? <p style={{ color: '#94a3b8' }}>Loading...</p> : (
        <div className="card">
          {appointments.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#94a3b8' }}>
              <Calendar size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No appointments scheduled.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="custom-table">
                <thead>
                  <tr><th>Date</th><th>Time</th><th>Patient</th><th>Reason</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {appointments.sort((a, b) => b.appointmentDate.localeCompare(a.appointmentDate)).map(a => (
                    <tr key={a.id}>
                      <td>{a.appointmentDate}</td>
                      <td>{a.startTime}</td>
                      <td>{a.patientName}</td>
                      <td>{a.reason || '—'}</td>
                      <td><StatusBadge status={a.status} /></td>
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

export default DoctorAppointments;
