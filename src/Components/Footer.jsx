// src/Components/Footer.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const courses = [
    { name: 'WebTech', icon: '🌐', route: '/webtech', color: '#3b82f6' },
    { name: 'React',   icon: '⚛️', route: '/reacts',  color: '#06b6d4' },
    { name: 'Java',    icon: '☕', route: '/java',     color: '#f59e0b' },
    { name: 'Python',  icon: '🐍', route: '/python',   color: '#10b981' },
    { name: 'Testing', icon: '🧪', route: '/testing',  color: '#a78bfa' },
  ];

  const quickLinks = [
    { name: 'Home',             route: '/' },
    { name: 'Add Student',      route: '/dataCreate' },
    { name: 'Manage Students',  route: '/dataHome' },
    { name: 'Trainer Login',    route: '/tlogin' },
    { name: 'Trainer Register', route: '/tregister' },
  ];

  const contactInfo = [
    { icon: '📧', label: 'admin@studentmgmt.com' },
    { icon: '📞', label: '+91 9623415490' },
    { icon: '📍', label: 'Pune, Maharashtra, India' },
    { icon: '🕐', label: 'Mon – Sat: 9 AM – 6 PM' },
  ];

  const stats = [
    { icon: '👥', value: '500+', label: 'Students Enrolled' },
    { icon: '📘', value: '5',    label: 'Active Courses' },
    { icon: '🏆', value: '98%',  label: 'Placement Rate' },
    { icon: '👨‍🏫', value: '10+', label: 'Expert Trainers' },
  ];

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#6b7280',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'color 0.2s',
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    color: '#4f8dff',
    fontWeight: '600',
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(180deg, #0f1117 0%, #080b12 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        marginTop: '60px',
      }}
    >
      {/* Top glow line */}
      <div
        style={{
          height: '2px',
          background:
            'linear-gradient(90deg, transparent, #4f8dff, #a78bfa, transparent)',
        }}
      />

      {/* Main grid */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '56px 32px 40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '28px' }}>🎓</span>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#e8eaf6' }}>
              StudentMgmt
            </span>
          </div>

          <p style={{ color: '#6b7280', fontSize: '13px', lineHeight: '1.8', maxWidth: '240px' }}>
            A modern student management portal to track enrolments, manage
            batches, and monitor course-wise progress — all in one place.
          </p>

          {/* Social Links (FIXED) */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            {[
              { label: 'GitHub',   icon: '🐙', href: 'https://github.com' },
              { label: 'LinkedIn', icon: '💼', href: 'https://linkedin.com' },
              { label: 'Twitter',  icon: '🐦', href: 'https://twitter.com' },
              { label: 'Email',    icon: '📧', href: 'mailto:admin@studentmgmt.com' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Courses */}
        <div>
          <h4 style={{ color: '#e8eaf6', marginBottom: '20px' }}>Courses</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {courses.map((c) => (
              <li key={c.name}>
                <NavLink to={c.route} style={navLinkStyle}>
                  {c.icon} {c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#e8eaf6', marginBottom: '20px' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {quickLinks.map((l) => (
              <li key={l.name}>
                <NavLink to={l.route} style={navLinkStyle}>
                  ▶ {l.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ color: '#e8eaf6', marginBottom: '20px' }}>Contact</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {contactInfo.map((item) => (
              <li key={item.label}>
                {item.icon} {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>
        © {currentYear} StudentMgmt — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;