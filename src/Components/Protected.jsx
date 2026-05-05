import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = ({ Comp }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const isTrainer = sessionStorage.getItem("isTrainer");
      if (isTrainer === "true") {
        setIsLoading(false);
      } else {
        navigate("/tlogin");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: "100vh", background: "#0f1117",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "16px",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
      }}>
        <div style={{
          width: "40px", height: "40px",
          border: "3px solid rgba(79,141,255,0.2)",
          borderTopColor: "#4f8dff", borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
        <p style={{ color: "#6b7280", fontSize: "14px", margin: 0 }}>Verifying access…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <Comp />;
};

export default Protected;