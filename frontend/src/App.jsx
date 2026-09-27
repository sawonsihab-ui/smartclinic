import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Login from './pages/Login';

// Lazy-loaded role pages
const Register = React.lazy(() => import('./pages/Register'));

// Patient pages
const PatientDashboard = React.lazy(() => import('./pages/patient/PatientDashboard'));
const BookAppointment = React.lazy(() => import('./pages/patient/BookAppointment'));
const MyAppointments = React.lazy(() => import('./pages/patient/MyAppointments'));
const QueueStatus = React.lazy(() => import('./pages/patient/QueueStatus'));
const MedicalRecords = React.lazy(() => import('./pages/patient/MedicalRecords'));
const MyPrescriptions = React.lazy(() => import('./pages/patient/MyPrescriptions'));
const LabResults = React.lazy(() => import('./pages/patient/LabResults'));
const PatientNotifications = React.lazy(() => import('./pages/patient/PatientNotifications'));
const PatientProfile = React.lazy(() => import('./pages/patient/PatientProfile'));

// Doctor pages
const DoctorDashboard = React.lazy(() => import('./pages/doctor/DoctorDashboard'));
const DoctorAppointments = React.lazy(() => import('./pages/doctor/DoctorAppointments'));
const DoctorQueue = React.lazy(() => import('./pages/doctor/DoctorQueue'));
const PatientHistory = React.lazy(() => import('./pages/doctor/PatientHistory'));

// Nurse pages
const NurseDashboard = React.lazy(() => import('./pages/nurse/NurseDashboard'));
const CheckInPatient = React.lazy(() => import('./pages/nurse/CheckInPatient'));
const RecordVitals = React.lazy(() => import('./pages/nurse/RecordVitals'));
const StaffTasks = React.lazy(() => import('./pages/nurse/StaffTasks'));

// Staff pages
const StaffDashboard = React.lazy(() => import('./pages/staff/StaffDashboard'));
const StaffPatients = React.lazy(() => import('./pages/staff/StaffPatients'));
const StaffAppointments = React.lazy(() => import('./pages/staff/StaffAppointments'));
const StaffQueue = React.lazy(() => import('./pages/staff/StaffQueue'));
const StaffTasksPage = React.lazy(() => import('./pages/staff/StaffTasksPage'));

// Admin pages
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const ManageUsers = React.lazy(() => import('./pages/admin/ManageUsers'));
const ManageDoctors = React.lazy(() => import('./pages/admin/ManageDoctors'));
const ManageDepartments = React.lazy(() => import('./pages/admin/ManageDepartments'));
const AllAppointments = React.lazy(() => import('./pages/admin/AllAppointments'));
const Analytics = React.lazy(() => import('./pages/admin/Analytics'));

const AppLayout = ({ children }) => (
  <div className="app-layout">
    <Sidebar />
    <div className="main-content">
      <Navbar />
      <React.Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>Loading...</div>}>
        {children}
      </React.Suspense>
    </div>
  </div>
);

const RoleRedirect = () => {
  const { user } = useAuth();
  const roleRoutes = {
    PATIENT: '/patient/dashboard',
    DOCTOR: '/doctor/dashboard',
    NURSE: '/nurse/dashboard',
    STAFF: '/staff/dashboard',
    ADMIN: '/admin/dashboard',
  };
  if (user) return <Navigate to={roleRoutes[user.role] || '/'} replace />;
  return <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <React.Suspense fallback={<div style={{ padding: '2rem' }}>Loading...</div>}>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<RoleRedirect />} />

        {/* Patient routes */}
        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><PatientDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/book" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><BookAppointment /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/appointments" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><MyAppointments /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/queue" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><QueueStatus /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/records" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><MedicalRecords /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/prescriptions" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><MyPrescriptions /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/lab-results" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><LabResults /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/notifications" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><PatientNotifications /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/patient/profile" element={
          <ProtectedRoute allowedRoles={['PATIENT']}>
            <AppLayout><PatientProfile /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Doctor routes */}
        <Route path="/doctor/dashboard" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <AppLayout><DoctorDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/doctor/appointments" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <AppLayout><DoctorAppointments /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/doctor/queue" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <AppLayout><DoctorQueue /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/doctor/patients" element={
          <ProtectedRoute allowedRoles={['DOCTOR']}>
            <AppLayout><PatientHistory /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Nurse routes */}
        <Route path="/nurse/dashboard" element={
          <ProtectedRoute allowedRoles={['NURSE']}>
            <AppLayout><NurseDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/nurse/check-in" element={
          <ProtectedRoute allowedRoles={['NURSE']}>
            <AppLayout><CheckInPatient /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/nurse/vitals" element={
          <ProtectedRoute allowedRoles={['NURSE']}>
            <AppLayout><RecordVitals /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/nurse/tasks" element={
          <ProtectedRoute allowedRoles={['NURSE']}>
            <AppLayout><StaffTasks /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Staff routes */}
        <Route path="/staff/dashboard" element={
          <ProtectedRoute allowedRoles={['STAFF']}>
            <AppLayout><StaffDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/staff/patients" element={
          <ProtectedRoute allowedRoles={['STAFF']}>
            <AppLayout><StaffPatients /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/staff/appointments" element={
          <ProtectedRoute allowedRoles={['STAFF']}>
            <AppLayout><StaffAppointments /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/staff/queue" element={
          <ProtectedRoute allowedRoles={['STAFF']}>
            <AppLayout><StaffQueue /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/staff/tasks" element={
          <ProtectedRoute allowedRoles={['STAFF']}>
            <AppLayout><StaffTasksPage /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Admin routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><AdminDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/users" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><ManageUsers /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/doctors" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><ManageDoctors /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/departments" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><ManageDepartments /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><AllAppointments /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/admin/analytics" element={
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <AppLayout><Analytics /></AppLayout>
          </ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </React.Suspense>
  );
}
