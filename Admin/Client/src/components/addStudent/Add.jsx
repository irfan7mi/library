import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const Add = () => {
  const [data, setData] = useState({
    stu_ID: "", 
    stu_Name: "", 
    mobile: "", 
    mail: "",
    dept: "", 
    stu_clg: "", 
    stu_year: "",
    stu_book: "NO"
  })

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const submit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:4000/student/add", data)
    if (response.data.success) {
      setData({
        stu_ID: "", 
        stu_Name: "", 
        mobile: "", 
        mail: "",
        dept: "", 
        stu_clg: "", 
        stu_year: "",
        stu_book: "NO"
      })   
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='add-container'>
      <form onSubmit={submit} className='add-card'>
        <h3 className='add-book-title'>Add Student</h3>
        <div className='bid-name-author'>
          <div>
            <label htmlFor="">Student ID</label>
            <input type="text" name='stu_ID' value={data.stu_ID} onChange={eventHandler} required maxLength={6}/>
          </div>
          <div>
            <label htmlFor="">Student Name</label>
            <input type="text" name="stu_Name" value={data.stu_Name} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">E-mail</label>
            <input type="mail" name='mail' value={data.mail} onChange={eventHandler} required/>
          </div>
        </div>
        <div className='category-year-place'>
          <div>
            <label htmlFor="">Mobile Number</label>
            <input type="text" name='mobile' value={data.mobile} onChange={eventHandler} required minLength={10} maxLength={10}/>
          </div>
          <div>
            <label htmlFor="">College Name</label>
            <input type="text" name="stu_clg" value={data.stu_clg} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">Dept</label>
            <input type="text" className='dept-input' name='dept' value={data.dept} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">Year</label>
            <input type="text" className='year-input' name='stu_year' value={data.stu_year} onChange={eventHandler} required/>
          </div>
        </div>
        <div className='add-student-btn-container'>
          <button className='submit-btn'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Add 