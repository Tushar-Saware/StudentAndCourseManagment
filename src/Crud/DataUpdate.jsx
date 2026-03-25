import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

const DataUpdate = () => {

  const { id } = useParams()
  const navigate = useNavigate()

  const [data, setData] = useState({
    name: "",
    email: "",
    contact: ""
  })

  // 🔹 Fetch record
  useEffect(() => {
    axios.get(`http://localhost:7000/students/${id}`)
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.error(err))
  }, [id])

  // 🔹 Update record
  const handleSubmit = (e) => {
    e.preventDefault()

    axios.put(`http://localhost:7000/students/${id}`, data)
      .then(() => {
        toast.success("Record updated successfully!")
        setTimeout(() => navigate('/dataHome'), 1500)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="container p-5 bg-white border rounded shadow" style={{ maxWidth: "500px" }}>

        <h1 className="text-center mb-4 text-primary">Update Employee</h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={e => setData({ ...data, email: e.target.value })}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Contact</label>
            <input
              type="text"
              value={data.contact}
              onChange={e => setData({ ...data, contact: e.target.value })}
              className="form-control"
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary px-4">
              Update
            </button>

            <button
              type="button"
              className="btn btn-secondary px-4"
              onClick={() => navigate('/dataHome')}
            >
              Back
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default DataUpdate