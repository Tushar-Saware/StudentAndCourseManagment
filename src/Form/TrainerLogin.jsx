import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TrainerLogin = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.get("http://localhost:5000/trainer");

     let trainers = res.data; 

      const trainer = trainers.find(
        (t) => t.email === data.email && t.password === data.password
      );

      if (!trainer) {
        toast.error("Invalid Email or Password!");
        setLoading(false);
        return;
      }

      sessionStorage.setItem("isTrainer", "true");

      setTimeout(() => {
        navigate("/dataHome");  
      }, 1200);

    } catch (error) {
      toast.error("Invalid Email or Password!"); 
    }

  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="p-5 bg-white border rounded shadow"
        style={{ width: "380px" }}
      >
        <h2 className="text-center mb-4">Trainer Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            className="btn btn-link w-100 mt-2"
            onClick={() => navigate("/tregister")}
          >
            Create new account?
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrainerLogin;
