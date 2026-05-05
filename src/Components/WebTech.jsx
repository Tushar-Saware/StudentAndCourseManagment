import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const META = { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', icon: '🌐' };

function getInitials(name = '') {
  return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

const WebTech = () => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => {
        const filtered = res.data.filter(s =>
          (s.course || '').toLowerCase().includes('webtech')
        );
        setData(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = data.filter(s =>
    (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117' }}>

      
      <div style={{
        background: 'linear-gradient(135deg, #1a1f35 0%, #0f1117 60%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 32px 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-60px', left: '-60px',
          width: '300px', height: '300px',
          background: 'rgba(59,130,246,0.08)', borderRadius: '50%',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <span style={{ fontSize: '28px' }}>🌐</span>
            <span style={{
              fontSize: '12px', fontWeight: '600', letterSpacing: '2px',
              textTransform: 'uppercase', color: '#3b82f6',
              background: 'rgba(59,130,246,0.1)', padding: '4px 12px',
              borderRadius: '20px', border: '1px solid rgba(59,130,246,0.2)',
            }}>
              Web Technologies
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(24px,4vw,38px)', fontWeight: '800',
            color: '#e8eaf6', letterSpacing: '-0.5px',
            marginBottom: '10px', lineHeight: 1.2,
          }}>
            WebTech<br />
            <span style={{
              background: 'linear-gradient(90deg,#3b82f6,#60a5fa)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Students
            </span>
          </h1>
          <p style={{ color: '#6b7280', fontSize: '14px', maxWidth: '420px' }}>
            All students enrolled in the Web Technologies course — HTML, CSS, JavaScript & more.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Total Enrolled', value: loading ? '…' : data.length,     color: '#3b82f6', icon: '👥' },
              { label: 'Search Results', value: loading ? '…' : filtered.length, color: '#34d399', icon: '🔍' },
              { label: 'Course',         value: 'WebTech',                        color: '#a78bfa', icon: '📘' },
              { label: 'Batch',          value:  new Date().getUTCFullYear(),                           color: '#fb923c', icon: '📅' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '14px', padding: '16px 22px', minWidth: '130px',
                borderTop: `2px solid ${s.color}`,
              }}>
                <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
                <div style={{ fontSize: '24px', fontWeight: '800', color: s.color, letterSpacing: '-1px' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px', fontWeight: '500' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Student List ── */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px' }}>

        {/* Toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', flexWrap: 'wrap',
          gap: '12px', marginBottom: '20px',
        }}>
          <h2 style={{ color: '#e8eaf6', fontSize: '16px', fontWeight: '700', margin: 0 }}>
            Enrolled Students
            <span style={{
              marginLeft: '10px', background: 'rgba(59,130,246,0.15)',
              color: '#3b82f6', fontSize: '11px',
              padding: '3px 10px', borderRadius: '20px', fontWeight: '600',
            }}>
              {filtered.length}
            </span>
          </h2>

          {/* Search */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '10px', top: '50%',
              transform: 'translateY(-50%)', color: '#6b7280', fontSize: '13px',
            }}>🔍</span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search name or email…"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '10px', padding: '8px 12px 8px 32px',
                color: '#e8eaf6', fontSize: '13px',
                outline: 'none', fontFamily: 'inherit', width: '220px',
              }}
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>
            <div>Loading students…</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔍</div>
            <div>No WebTech students found</div>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: '16px',
          }}>
            {filtered.map((val, i) => (
              <div key={val.id || i} style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '16px', padding: '20px',
                position: 'relative', overflow: 'hidden',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.4)';
                  e.currentTarget.style.background = META.bg;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                  background: 'linear-gradient(90deg, #3b82f6, transparent)',
                }} />

                {/* Avatar + Name */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                    background: META.bg, color: META.color,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '14px',
                    border: '1px solid rgba(59,130,246,0.3)',
                  }}>
                    {getInitials(val.name)}
                  </div>
                  <div>
                    <div style={{ color: '#e8eaf6', fontWeight: '700', fontSize: '14px', lineHeight: 1.3 }}>
                      {val.name}
                    </div>
                    <div style={{ color: '#6b7280', fontSize: '11px', marginTop: '2px' }}>
                      #{val.id || `STU-${String(i + 1).padStart(3, '0')}`}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div style={{
                  color: '#6b7280', fontSize: '11px', marginBottom: '10px',
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                  <span>📧</span> {val.email}
                </div>

                {/* Course chip */}
                <div style={{ marginBottom: '14px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    background: META.bg, color: META.color,
                    border: '1px solid rgba(59,130,246,0.3)',
                    padding: '3px 10px', borderRadius: '8px',
                    fontSize: '11px', fontWeight: '600',
                  }}>
                    🌐 {val.course || 'WebTech'}
                  </span>
                </div>

                {/* View Profile button */}
                <NavLink to={`/studentsdetails/${val.id}`} style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', padding: '8px', borderRadius: '10px',
                    border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(135deg, #3b82f6cc, #3b82f688)',
                    color: '#fff', fontWeight: '600', fontSize: '12px',
                    fontFamily: 'inherit', transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                  >
                    View Profile →
                  </button>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WebTech;