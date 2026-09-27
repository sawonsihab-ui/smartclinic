import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, Clock, Users, Award, ChevronRight, Stethoscope } from 'lucide-react';

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Header Bar */}
      <header style={{
        padding: '1.25rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Activity size={28} color="#0284c7" />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
            SmartClinic<span style={{ color: '#0284c7' }}>+</span>
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to="/login" className="btn btn-secondary">Login</Link>
          <Link to="/register" className="btn btn-primary">Register Patient</Link>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        padding: '4rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '0.35rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            Smart Healthcare Management Platform
          </span>
          <h2 style={{ fontSize: '2.75rem', fontWeight: 800, marginTop: '1.25rem', marginBottom: '1rem', lineHeight: 1.2 }}>
            Next-Generation Outpatient Clinic & Patient Care
          </h2>
          <p style={{ fontSize: '1.15rem', opacity: 0.9, marginBottom: '2rem' }}>
            Seamless appointment scheduling, real-time ticket queues, electronic medical records, digital prescriptions, and AI-driven predictive volume analytics.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn" style={{ background: 'white', color: '#0369a1', fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
              Book an Appointment <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="page-container" style={{ marginTop: '-3rem' }}>
        <div className="stats-grid">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', background: '#e0f2fe', color: '#0284c7', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Clock size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Smart Queue System</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Live patient ticket tracking with priority-based queue handling for emergency and urgent cases.</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', background: '#d1fae5', color: '#10b981', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <ShieldCheck size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Double-Booking Safe</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Transaction-isolated doctor slot booking with real-time schedule conflict validation.</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ width: '56px', height: '56px', background: '#fae8ff', color: '#a21caf', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
              <Stethoscope size={28} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Electronic Records & Rx</h3>
            <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Digital medical records, lab result uploads, vitals logging, and clean printable prescriptions.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid #e2e8f0', color: '#64748b', fontSize: '0.9rem' }}>
        SmartClinic+ &copy; 2026 University Software Engineering Project
      </footer>
    </div>
  );
};

export default Home;
