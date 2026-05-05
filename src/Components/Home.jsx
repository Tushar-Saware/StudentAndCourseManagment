import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const COURSE_META = {
  WebTech:   { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  icon: '🌐', route: '/webtech'  },
  React:     { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)',   icon: '⚛️', route: '/reacts'   },
  Java:      { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  icon: '☕', route: '/java'     },
  Python:    { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  icon: '🐍', route: '/python'   },
  Testing:   { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', icon: '🧪', route: '/testing'  },
};

const DEFAULT_META = { color: '#6b7280', bg: 'rgba(107,114,128,0.1)', icon: '📚', route: '#' };

function getInitials(name = '') {
  return name.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function getMeta(course = '') {
  const key = Object.keys(COURSE_META).find(k => course.toLowerCase().includes(k.toLowerCase()));
  return key ? COURSE_META[key] : DEFAULT_META;
}

const Home = () => {
  const [data, setData]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [active, setActive]   = useState('All');

  useEffect(() => {
    axios.get('http://localhost:8080/students')
      .then(res => { setData(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const courses    = ['All', ...Object.keys(COURSE_META)];
  const activeCnt  = data.filter(s => s.status === 'active' || !s.status).length;

  const filtered = data.filter(s => {
    const matchCourse = active === 'All' || (s.course || '').toLowerCase().includes(active.toLowerCase());
    const matchSearch = (s.name || '').toLowerCase().includes(search.toLowerCase()) ||
                        (s.email || '').toLowerCase().includes(search.toLowerCase());
    return matchCourse && matchSearch;
  });

  return (
    <div style={{ minHeight: '100vh', background: '#0f1117', paddingTop: '0px' ,marginTop:'-20px' }}>

      {/* ── Hero Banner ── */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1f35 0%, #0f1117 60%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '48px 32px 40px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* glow blobs */}
        <div style={{ position:'absolute', top:'-60px', left:'-60px', width:'300px', height:'300px',
          background:'rgba(79,141,255,0.08)', borderRadius:'50%', filter:'blur(80px)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-40px', right:'80px', width:'250px', height:'250px',
          background:'rgba(167,139,250,0.07)', borderRadius:'50%', filter:'blur(70px)', pointerEvents:'none' }} />

        <div style={{ maxWidth:'1200px', margin:'0 auto', position:'relative' }}>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'10px' }}>
            <span style={{ fontSize:'28px' }}>🎓</span>
            <span style={{ fontSize:'12px', fontWeight:'600', letterSpacing:'2px', textTransform:'uppercase',
              color:'#4f8dff', background:'rgba(79,141,255,0.1)', padding:'4px 12px', borderRadius:'20px',
              border:'1px solid rgba(79,141,255,0.2)' }}>
              Live Dashboard
            </span>
          </div>

          <h1 style={{ fontSize:'clamp(24px,4vw,38px)', fontWeight:'800', color:'#e8eaf6',
            letterSpacing:'-0.5px', marginBottom:'10px', lineHeight:1.2 }}>
            Student Management<br />
            <span style={{ background:'linear-gradient(90deg,#4f8dff,#a78bfa)', WebkitBackgroundClip:'text',
              WebkitTextFillColor:'transparent' }}>Portal</span>
          </h1>
          <p style={{ color:'#6b7280', fontSize:'14px', maxWidth:'420px' }}>
            Track enrolments, view course-wise batches and manage all student records from one place.
          </p>

          {/* Quick stats */}
          <div style={{ display:'flex', gap:'16px', marginTop:'32px', flexWrap:'wrap' }}>
            {[
              { label:'Total Students', value: loading ? '…' : data.length,      color:'#4f8dff', icon:'👥' },
              { label:'Active Now',     value: loading ? '…' : activeCnt,         color:'#34d399', icon:'✅' },
              { label:'Courses',        value: Object.keys(COURSE_META).length,   color:'#a78bfa', icon:'📘' },
              { label:'Batches',        value:  new Date().getUTCFullYear(),                            color:'#fb923c', icon:'📅' },
            ].map(s => (
              <div key={s.label} style={{
                background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.07)',
                borderRadius:'14px', padding:'16px 22px', minWidth:'130px',
                borderTop:`2px solid ${s.color}`,
              }}>
                <div style={{ fontSize:'20px', marginBottom:'4px' }}>{s.icon}</div>
                <div style={{ fontSize:'24px', fontWeight:'800', color:s.color, letterSpacing:'-1px' }}>{s.value}</div>
                <div style={{ fontSize:'11px', color:'#6b7280', marginTop:'2px', fontWeight:'500' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Course Shortcut Cards ── */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'32px 32px 0' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'16px' }}>
          <h2 style={{ color:'#e8eaf6', fontSize:'16px', fontWeight:'700', margin:0 }}>Browse by Course</h2>
          <span style={{ color:'#6b7280', fontSize:'12px' }}>{Object.keys(COURSE_META).length} active courses</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(160px,1fr))', gap:'12px' }}>
          {Object.entries(COURSE_META).map(([name, meta]) => (
            <NavLink key={name} to={meta.route} style={{ textDecoration:'none' }}>
              <div style={{
                background:'rgba(255,255,255,0.03)', border:`1px solid rgba(255,255,255,0.07)`,
                borderRadius:'14px', padding:'18px 16px', cursor:'pointer',
                transition:'all 0.2s', borderLeft:`3px solid ${meta.color}`,
              }}
                onMouseEnter={e => { e.currentTarget.style.background = meta.bg; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize:'22px', marginBottom:'8px' }}>{meta.icon}</div>
                <div style={{ color:'#e8eaf6', fontWeight:'600', fontSize:'13px' }}>{name}</div>
                <div style={{ color: meta.color, fontSize:'11px', marginTop:'4px', fontWeight:'500' }}>
                  {data.filter(s => (s.course || '').toLowerCase().includes(name.toLowerCase())).length} students →
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* ── Student List ── */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'32px' }}>

        {/* Toolbar */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:'12px', marginBottom:'20px' }}>
          <h2 style={{ color:'#e8eaf6', fontSize:'16px', fontWeight:'700', margin:0 }}>
            All Students
            <span style={{ marginLeft:'10px', background:'rgba(79,141,255,0.15)', color:'#4f8dff',
              fontSize:'11px', padding:'3px 10px', borderRadius:'20px', fontWeight:'600' }}>
              {filtered.length}
            </span>
          </h2>
          <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', alignItems:'center' }}>

            {/* Search */}
            <div style={{ position:'relative' }}>
              <span style={{ position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)',
                color:'#6b7280', fontSize:'13px' }}>🔍</span>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name or email…"
                style={{
                  background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
                  borderRadius:'10px', padding:'8px 12px 8px 32px', color:'#e8eaf6',
                  fontSize:'13px', outline:'none', fontFamily:'inherit', width:'210px',
                }}
              />
            </div>

            {/* Course filter */}
            <div style={{ display:'flex', gap:'4px', background:'rgba(255,255,255,0.04)',
              border:'1px solid rgba(255,255,255,0.07)', borderRadius:'10px', padding:'4px' }}>
              {courses.map(c => (
                <button key={c} onClick={() => setActive(c)} style={{
                  padding:'5px 12px', borderRadius:'7px', border:'none', cursor:'pointer',
                  fontSize:'12px', fontWeight:'500', fontFamily:'inherit', transition:'all 0.15s',
                  background: active === c ? 'rgba(79,141,255,0.2)' : 'transparent',
                  color: active === c ? '#4f8dff' : '#6b7280',
                }}>
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div style={{ textAlign:'center', padding:'60px', color:'#6b7280' }}>
            <div style={{ fontSize:'32px', marginBottom:'12px' }}>⏳</div>
            <div>Loading students…</div>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign:'center', padding:'60px', color:'#6b7280' }}>
            <div style={{ fontSize:'32px', marginBottom:'12px' }}>🔍</div>
            <div>No students found</div>
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'16px' }}>
            {filtered.map((val, i) => {
              const meta = getMeta(val.course);
              return (
                <div key={val.id || i} style={{
                  background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)',
                  borderRadius:'16px', padding:'20px', position:'relative', overflow:'hidden',
                  transition:'all 0.2s', cursor:'default',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.borderColor = `${meta.color}40`;
                    e.currentTarget.style.background = meta.bg; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                >
                  {/* top accent */}
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:'2px',
                    background:`linear-gradient(90deg, ${meta.color}, transparent)` }} />

                  {/* Avatar + info */}
                  <div style={{ display:'flex', alignItems:'center', gap:'12px', marginBottom:'14px' }}>
                    <div style={{
                      width:'40px', height:'40px', borderRadius:'12px', flexShrink:0,
                      background: meta.bg, color: meta.color,
                      display:'flex', alignItems:'center', justifyContent:'center',
                      fontWeight:'800', fontSize:'14px', border:`1px solid ${meta.color}30`,
                    }}>
                      {getInitials(val.name)}
                    </div>
                    <div>
                      <div style={{ color:'#e8eaf6', fontWeight:'700', fontSize:'14px', lineHeight:1.3 }}>
                        {val.name}
                      </div>
                      <div style={{ color:'#6b7280', fontSize:'11px', marginTop:'2px' }}>
                        #{val.id || `STU-${String(i + 1).padStart(3, '0')}`}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div style={{ color:'#6b7280', fontSize:'11px', marginBottom:'10px',
                    display:'flex', alignItems:'center', gap:'5px' }}>
                    <span>📧</span> {val.email}
                  </div>

                  {/* Course chip */}
                  <div style={{ marginBottom:'14px' }}>
                    <span style={{
                      display:'inline-flex', alignItems:'center', gap:'5px',
                      background: meta.bg, color: meta.color,
                      border:`1px solid ${meta.color}30`,
                      padding:'3px 10px', borderRadius:'8px', fontSize:'11px', fontWeight:'600',
                    }}>
                      {meta.icon} {val.course || 'N/A'}
                    </span>
                  </div>

                  {/* View button → routes to studentsdetails/:id */}
                  <NavLink to={`/studentsdetails/${val.id}`} style={{ textDecoration:'none' }}>
                    <button style={{
                      width:'100%', padding:'8px', borderRadius:'10px', border:'none', cursor:'pointer',
                      background:`linear-gradient(135deg, ${meta.color}cc, ${meta.color}88)`,
                      color:'#fff', fontWeight:'600', fontSize:'12px', fontFamily:'inherit',
                      transition:'opacity 0.2s',
                    }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      View Profile →
                    </button>
                  </NavLink>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;