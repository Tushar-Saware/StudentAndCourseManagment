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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.post("http://localhost:5000/trainer", data);
      toast.success("Registration Successful!");
      setTimeout(() => navigate("/tlogin"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light ">
      <div
        className="container p-5 bg-white border rounded shadow"
        style={{ maxWidth: "420px" }}
      >
        <h2 className="text-center mb-4">Trainer Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter contact number"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Subject</label>
            <select
              className="form-select"
              value={data.subject}
              onChange={(e) => setData({ ...data, subject: e.target.value })}
              required
            >
              <option value="">Select Subject</option>
              <option value="Java">Java</option>
              <option value="WebTech">WebTech</option>
              <option value="SQL">SQL</option>
              <option value="React">React</option>
            </select>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>
            
            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/tlogin")}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TrainerRegister;
