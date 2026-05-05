import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TrainerRegister = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    subject: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/addteacher", data);
      toast.success("Registration Successful!");
      setTimeout(() => navigate("/tlogin"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Try again.");
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%", padding: "11px 14px 11px 40px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "12px", color: "#e8eaf6", fontSize: "14px",
    outline: "none", fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block", color: "#9ca3af", fontSize: "12px",
    fontWeight: "600", marginBottom: "8px",
    letterSpacing: "0.5px", textTransform: "uppercase",
  };

  const subjects = ["Java", "WebTech", "SQL", "React", "Python", "Testing"];

  return (
    <div style={{
      minHeight: "100vh", background: "#0f1117",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>

      {/* Glow orbs */}
      <div style={{ position:"fixed", top:"-80px", right:"-80px", width:"380px", height:"380px",
        background:"rgba(167,139,250,0.09)", borderRadius:"50%", filter:"blur(90px)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"-60px", left:"-60px", width:"320px", height:"320px",
        background:"rgba(79,141,255,0.08)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none" }} />

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "440px", position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px", padding: "40px 36px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>

        {/* Top accent */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
          background: "linear-gradient(90deg, transparent, #a78bfa, #4f8dff, transparent)",
          borderRadius: "2px",
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "54px", height: "54px", borderRadius: "16px", margin: "0 auto 14px",
            background: "linear-gradient(135deg, #a78bfa, #4f8dff)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
          }}>✏️</div>
          <h1 style={{ color: "#e8eaf6", fontSize: "22px", fontWeight: "800",
            letterSpacing: "-0.5px", margin: "0 0 6px" }}>
            Create Account
          </h1>
          <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
            Register as a trainer to get started
          </p>
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "28px" }}>
          {["Personal", "Credentials", "Subject"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "6px", flex: i < 2 ? 1 : 0 }}>
              <div style={{
                width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg,#4f8dff,#a78bfa)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "10px", fontWeight: "700", color: "#fff",
              }}>{i + 1}</div>
              <span style={{ fontSize: "11px", color: "#6b7280", whiteSpace: "nowrap" }}>{step}</span>
              {i < 2 && <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Full Name</label>
            <div style={{ position: "relative" }}>
              <span style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"15px", pointerEvents:"none" }}>👤</span>
              <input
                type="text" placeholder="e.g. Rahul Sharma"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
            </div>
          </div>

          {/* Email */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Email Address</label>
            <div style={{ position: "relative" }}>
              <span style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"15px", pointerEvents:"none" }}>📧</span>
              <input
                type="email" placeholder="trainer@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Password</label>
            <div style={{ position: "relative" }}>
              <span style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"15px", pointerEvents:"none" }}>🔒</span>
              <input
                type={showPass ? "text" : "password"} placeholder="Create a strong password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required style={{ ...inputStyle, paddingRight: "42px" }}
                onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)",
                background:"none", border:"none", cursor:"pointer", fontSize:"15px", padding:"2px",
              }}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>Contact Number</label>
            <div style={{ position: "relative" }}>
              <span style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", fontSize:"15px", pointerEvents:"none" }}>📞</span>
              <input
                type="text" placeholder="10-digit mobile number"
                value={data.contact}
                onChange={(e) => setData({ ...data, contact: e.target.value })}
                required style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(167,139,250,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
            </div>
          </div>

          {/* Subject — pill select */}
          <div style={{ marginBottom: "26px" }}>
            <label style={labelStyle}>Select Subject</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {subjects.map(s => (
                <button
                  key={s} type="button"
                  onClick={() => setData({ ...data, subject: s })}
                  style={{
                    padding: "7px 16px", borderRadius: "20px", border: "1px solid",
                    fontSize: "12px", fontWeight: "600", cursor: "pointer",
                    fontFamily: "inherit", transition: "all 0.15s",
                    borderColor: data.subject === s ? "#a78bfa" : "rgba(255,255,255,0.1)",
                    background: data.subject === s ? "rgba(167,139,250,0.15)" : "rgba(255,255,255,0.03)",
                    color: data.subject === s ? "#a78bfa" : "#6b7280",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
            {/* hidden input to satisfy form required */}
            <input type="text" required value={data.subject} readOnly
              style={{ position:"absolute", opacity:0, pointerEvents:"none", width:0, height:0 }} />
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "12px",
            background: loading
              ? "rgba(167,139,250,0.4)"
              : "linear-gradient(135deg, #a78bfa, #4f8dff)",
            border: "none", borderRadius: "12px", color: "#fff",
            fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", transition: "opacity 0.2s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {loading ? (
              <>
                <span style={{
                  display:"inline-block", width:"14px", height:"14px",
                  border:"2px solid rgba(255,255,255,0.4)", borderTopColor:"#fff",
                  borderRadius:"50%", animation:"spin 0.7s linear infinite",
                }} />
                Registering…
              </>
            ) : "Create Account →"}
          </button>

          {/* Login link */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ color: "#6b7280", fontSize: "13px" }}>Already have an account? </span>
            <button type="button" onClick={() => navigate("/tlogin")} style={{
              background: "none", border: "none", color: "#a78bfa", fontSize: "13px",
              fontWeight: "600", cursor: "pointer", fontFamily: "inherit", padding: 0,
            }}>
              Sign in
            </button>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default TrainerRegister;