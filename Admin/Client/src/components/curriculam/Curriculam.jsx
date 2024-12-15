import React, { useState } from 'react'
import './Curriculam.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const Curriculam = () => {
  const [data, setData] = useState({
    bookID: "", 
    stu_clg: "", 
    dept: "", 
    stu_year: ""
  })

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const submit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:4000/curriculam/add", data)
    if (response.data.success) {
      setData({
        bookID: "", 
        stu_clg: "", 
        dept: "", 
        stu_year: ""
      })   
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='curriculam-page'>
      <form className='curriculam-card' onSubmit={submit}>
      <h3 className='curriculam-title'>Add Curriculam</h3>
        <div className='bid-dept-year'>
          <div>
            <label htmlFor="">Book ID</label>
            <input type="text" name='bookID' value={data.bookID} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">College Name</label>
            <input type="text" name="stu_clg" value={data.stu_clg} onChange={eventHandler} required/>
          </div>
          <div className='dept-year-container'>
            <div>
              <label htmlFor="">Dept</label>
              <input type="text" className='dept-input' value={data.dept} name='dept' onChange={eventHandler} required/>
            </div>
            <div>
              <label htmlFor="">Year</label>
              <input type="text" className='year-input' name='stu_year' value={data.stu_year} onChange={eventHandler} required/>
            </div>
          </div>
        </div>
        <div className='curriculam-btn-container'>
          <button className='submit-btn'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Curriculam 