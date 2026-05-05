import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DataRead = () => {
  const { id } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/students/" + id) 
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("Error loading data:", error);
      });
  }, [id]); 

  return (
    <div className="read-wrapper d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg border-0" style={{ width: "24rem", borderRadius: "15px" }}>
        <div className="card-body text-center p-4">

          <h5 className="card-title mb-4 text-primary fw-bold">
            👤 Student Details
          </h5>

          <h6 className="card-subtitle mb-3 text-secondary">
            <strong>Name:</strong> {data.name}
          </h6>

          <h6 className="card-subtitle mb-3 text-secondary">
            <strong>Email:</strong> {data.email}
          </h6>

          <h6 className="card-subtitle mb-4 text-secondary">
            <strong>Contact:</strong> {data.contact}
          </h6>

          <div className="d-flex justify-content-center gap-3">
            <Link to={`/dataUpdate/${id}`} className="btn btn-info px-4 shadow-sm">
              ✏️ Edit
            </Link>

            <Link to="/dataHome" className="btn btn-primary px-4 shadow-sm">
              ⬅️ Back
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DataRead;
