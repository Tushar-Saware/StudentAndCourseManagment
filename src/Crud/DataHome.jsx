import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const DataHome = () => {

    const[data,setData] = useState([]);
    const[loading,setLoading] =useState(true);

    useEffect(()=>{
        axios.get("http://localhost:7000/students").then((val)=>{
            setData(val.data);

            setLoading(false);
        })
    },[])

    if(loading){
        return <div className="loader"></div>
    }

    function handleDelete(id){
        let agree = confirm("Are you sure you want to delete this?")
        
        if(agree){
            axios.delete("http://localhost:7000/students/"+id).then((v)=>{
                console.log(v);
                window.location.reload()
                
            })
        }
    }

    
    function handleLogout() {
        sessionStorage.clear();
        window.location.href = "/tlogin"; 
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Employee Details</h2>

        <div className='d-flex justify-content-end'>
            <Link onClick={handleLogout} className="btn btn-danger me-2">Logout</Link>
            <Link to="/dataCreate" className="btn btn-success">Add+</Link>
        </div>

        <table className="table-striped table">
            <thead>
                <tr>
                <th >Ename</th>
                <th >Email</th>
                <th >Contact</th>
                <th >Qualification</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    data?.map((v,i) => (
                        <tr key={i}>
                            <td>{v.name}</td>
                            <td>{v.email}</td>
                            <td>{v.contact}</td>
                            <td>{v.qualification}</td>
                            <td>
                                <Link to={`/dataRead/${v.id}`} className="btn btn-info me-2">Read</Link>
                                <Link to={`/dataUpdate/${v.id}`} className="btn btn-primary me-2">Update</Link>
                                <Link onClick={()=>handleDelete(v.id)} className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default DataHome