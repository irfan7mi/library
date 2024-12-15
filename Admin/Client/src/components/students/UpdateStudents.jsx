import React, { useContext, useEffect, useState } from 'react'
import './Students.css'
import { StoreContext } from '../context/Context'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateStudents = () => {
  const {id} = useParams()
  const [data, setData] = useState([])
  const navigate = useNavigate()

 const fetchFoodList = async () => {
  const response = await axios.get("http://localhost:4000/student/find/"+id)
  setData(response.data[0])
  }

  useEffect(() => { 
    async function loadData() {
      await fetchFoodList()
    }
    loadData()
  },[])

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const Submit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:4000/student/update/"+id, data)
    if (response.data.success) {
      setData({
        Sid: "", 
        Name: "", 
        Mail: "", 
        Mobile: "",
        College: "", 
        Dept: "", 
        Year: ""
      })   
      toast.success(response.data.message)
      navigate('/students')
    }
    else{
      toast.error(response.data.message)
    }
  }
  
  return (
    <div className='update-students-container'>
    <form onSubmit={Submit} className='add-card'>
      <h3 className='add-book-title'>Update Student</h3>
      <div className='bid-name-author'>
        <div>
          <label htmlFor="">Student ID</label>
          <input type="text" name='Sid' value={data.Sid} onChange={eventHandler} required maxLength={6}/>
        </div>
        <div>
          <label htmlFor="">Student Name</label>
          <input type="text" name="Name" value={data.Name} onChange={eventHandler} required/>
        </div>
        <div>
          <label htmlFor="">E-mail</label>
          <input type="mail" name='Mail' value={data.Mail} onChange={eventHandler} required/>
        </div>
      </div>
      <div className='category-year-place'>
        <div>
          <label htmlFor="">Mobile Number</label>
          <input type="text" name='Mobile' value={data.Mobile} onChange={eventHandler} required minLength={10} maxLength={10}/>
        </div>
        <div>
          <label htmlFor="">College Name</label>
          <input type="text" name="College" value={data.College} onChange={eventHandler} required/>
        </div>
        <div>
          <label htmlFor="">Dept</label>
          <input type="text" className='dept-input' name='Dept' value={data.Dept} onChange={eventHandler} required/>
        </div>
        <div>
          <label htmlFor="">Year</label>
          <input type="text" className='year-input' name='Year' value={data.Year} onChange={eventHandler} required/>
        </div>
      </div>
      <div className='add-student-btn-container'>
        <button className='submit-btn'>Submit</button>
      </div>
    </form>  
  </div>
  )
}

export default UpdateStudents
