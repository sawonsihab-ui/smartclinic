import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, CalendarPlus, Calendar, Clock, FileText,
  Pill, TestTube, Bell, User, Users, Stethoscope, Building2,
  CheckCircle, Activity, ClipboardList, BarChart3
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  if (!user) return null;

  const role = user.role;

  const patientLinks = [
    { to: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/patient/book', label: 'Book Appointment', icon: CalendarPlus },
    { to: '/patient/appointments', label: 'My Appointments', icon: Calendar },
    { to: '/patient/queue', label: 'Queue Status', icon: Clock },
    { to: '/patient/records', label: 'Medical Records', icon: FileText },
    { to: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
    { to: '/patient/lab-results', label: 'Lab Results', icon: TestTube },
    { to: '/patient/notifications', label: 'Notifications', icon: Bell },
    { to: '/patient/profile', label: 'My Profile', icon: User },
  ];

  const doctorLinks = [
    { to: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/doctor/appointments', label: 'Appointments', icon: Calendar },
    { to: '/doctor/queue', label: 'Active Queue', icon: Clock },
    { to: '/doctor/patients', label: 'Patient History', icon: Users },
  ];

  const nurseLinks = [
    { to: '/nurse/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/nurse/check-in', label: 'Check-in Patient', icon: CheckCircle },
    { to: '/nurse/vitals', label: 'Record Vitals', icon: Activity },
    { to: '/nurse/tasks', label: 'Staff Tasks', icon: ClipboardList },
  ];

  const staffLinks = [
    { to: '/staff/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/staff/patients', label: 'Patients', icon: Users },
    { to: '/staff/appointments', label: 'Appointments', icon: Calendar },
    { to: '/staff/queue', label: 'Queue Control', icon: Clock },
    { to: '/staff/tasks', label: 'Staff Tasks', icon: ClipboardList },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Manage Users', icon: Users },
    { to: '/admin/doctors', label: 'Doctors', icon: Stethoscope },
    { to: '/admin/departments', label: 'Departments', icon: Building2 },
    { to: '/admin/appointments', label: 'All Appointments', icon: Calendar },
    { to: '/admin/analytics', label: 'Analytics & Predictive AI', icon: BarChart3 },
  ];

  let links = [];
  if (role === 'PATIENT') links = patientLinks;
  else if (role === 'DOCTOR') links = doctorLinks;
  else if (role === 'NURSE') links = nurseLinks;
  else if (role === 'STAFF') links = staffLinks;
  else if (role === 'ADMIN') links = adminLinks;

  return (
    <aside style={{
      width: '240px',
      backgroundColor: '#0f172a',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.25rem 0.75rem',
      flexShrink: 0
    }}>
      <div style={{ padding: '0 0.75rem 1.25rem 0.75rem', borderBottom: '1px solid #1e293b', marginBottom: '1rem' }}>
        <p style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>
          {role} PANEL
        </p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {links.map((link) => {
          const IconComponent = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '8px',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: isActive ? '#ffffff' : '#94a3b8',
                backgroundColor: isActive ? '#0284c7' : 'transparent',
                transition: 'all 0.2s ease'
              })}
            >
              <IconComponent size={18} />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
