import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const StudentRegister = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    course: "",
    contact: "",
    address: "",
    gender: "",
    dob: "",
    qualification: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:7000/students", data);
      toast.success("Student Registered Successfully!");

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-light">
      <div
        className="container p-5 bg-white border rounded shadow"
        style={{ maxWidth: "550px" }}
      >
        <h2 className="text-center mb-4">Student Registration</h2>

        <form onSubmit={handleSubmit}>

          {/* NAME */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>

          {/* CONTACT */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Contact</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={data.contact}
              onChange={(e) => setData({ ...data, contact: e.target.value })}
              required
            />
          </div>

          {/* COURSE */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Course</label>
            <select
              className="form-select"
              value={data.course}
              onChange={(e) => setData({ ...data, course: e.target.value })}
              required
            >
              <option value="">Select Course</option>
              <option value="Java">Java</option>
              <option value="WebTech">WebTech</option>
              <option value="Python">Python</option>
              <option value="Testing">Testing</option>
              <option value="React">React</option>
            </select>
          </div>

          {/* ADDRESS */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Address</label>
            <textarea
              className="form-control"
              placeholder="Enter full address"
              rows="2"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
              required
            ></textarea>
          </div>

          {/* GENDER */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Gender</label>
            <select
              className="form-select"
              value={data.gender}
              onChange={(e) => setData({ ...data, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* DOB */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={data.dob}
              onChange={(e) => setData({ ...data, dob: e.target.value })}
              required
            />
          </div>

          {/* QUALIFICATION */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Qualification</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g., BSc, BCA, 12th, Diploma"
              value={data.qualification}
              onChange={(e) =>
                setData({ ...data, qualification: e.target.value })
              }
              required
            />
          </div>

          {/* BUTTONS */}
          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-primary px-4">
              Submit
            </button>

            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate("/")}
            >
              Back
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default StudentRegister;
