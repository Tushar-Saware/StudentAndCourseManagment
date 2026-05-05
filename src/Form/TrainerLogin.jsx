import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TrainerLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:8080/teachers");
      const trainer = res.data.find(
        (t) => t.email === data.email && t.password === data.password
      );

      if (!trainer) {
        toast.error("Invalid Email or Password!");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("isTrainer", "true");
      toast.success("Login successful! Redirecting…");
      setTimeout(() => navigate("/"), 1200);
    } catch {
      toast.error("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#0f1117",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px", fontFamily: "'Segoe UI', system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>

      {/* Background glow orbs */}
      <div style={{ position:"fixed", top:"-80px", left:"-80px", width:"350px", height:"350px",
        background:"rgba(79,141,255,0.10)", borderRadius:"50%", filter:"blur(90px)", pointerEvents:"none" }} />
      <div style={{ position:"fixed", bottom:"-60px", right:"-60px", width:"300px", height:"300px",
        background:"rgba(167,139,250,0.09)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none" }} />

      {/* Card */}
      <div style={{
        width: "100%", maxWidth: "400px", position: "relative", zIndex: 1,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px", padding: "40px 36px",
        boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
      }}>

        {/* Top accent line */}
        <div style={{
          position: "absolute", top: 0, left: "20%", right: "20%", height: "2px",
          background: "linear-gradient(90deg, transparent, #4f8dff, #a78bfa, transparent)",
          borderRadius: "2px",
        }} />

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            width: "54px", height: "54px", borderRadius: "16px", margin: "0 auto 14px",
            background: "linear-gradient(135deg, #4f8dff, #a78bfa)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px",
          }}>🎓</div>
          <h1 style={{ color: "#e8eaf6", fontSize: "22px", fontWeight: "800",
            letterSpacing: "-0.5px", margin: "0 0 6px" }}>
            Trainer Login
          </h1>
          <p style={{ color: "#6b7280", fontSize: "13px", margin: 0 }}>
            Sign in to access the dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div style={{ marginBottom: "18px" }}>
            <label style={{ display: "block", color: "#9ca3af", fontSize: "12px",
              fontWeight: "600", marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                fontSize: "15px", pointerEvents: "none" }}>📧</span>
              <input
                type="email"
                placeholder="trainer@example.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                style={{
                  width: "100%", padding: "11px 14px 11px 40px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "12px", color: "#e8eaf6", fontSize: "14px",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(79,141,255,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: "26px" }}>
            <label style={{ display: "block", color: "#9ca3af", fontSize: "12px",
              fontWeight: "600", marginBottom: "8px", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
                fontSize: "15px", pointerEvents: "none" }}>🔒</span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                style={{
                  width: "100%", padding: "11px 42px 11px 40px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "12px", color: "#e8eaf6", fontSize: "14px",
                  outline: "none", fontFamily: "inherit", boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={e => e.target.style.borderColor = "rgba(79,141,255,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.09)"}
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{
                position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", fontSize: "15px", padding: "2px",
              }}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "12px",
            background: loading
              ? "rgba(79,141,255,0.4)"
              : "linear-gradient(135deg, #4f8dff, #a78bfa)",
            border: "none", borderRadius: "12px", color: "#fff",
            fontSize: "14px", fontWeight: "700", cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "inherit", transition: "opacity 0.2s, transform 0.15s",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.88"; }}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            {loading ? (
              <>
                <span style={{ display:"inline-block", width:"14px", height:"14px", border:"2px solid rgba(255,255,255,0.4)",
                  borderTopColor:"#fff", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
                Signing in…
              </>
            ) : "Sign In →"}
          </button>

          {/* Register link */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <span style={{ color: "#6b7280", fontSize: "13px" }}>Don't have an account? </span>
            <button type="button" onClick={() => navigate("/tregister")} style={{
              background: "none", border: "none", color: "#4f8dff", fontSize: "13px",
              fontWeight: "600", cursor: "pointer", fontFamily: "inherit", padding: 0,
            }}>
              Register here
            </button>
          </div>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default TrainerLogin;