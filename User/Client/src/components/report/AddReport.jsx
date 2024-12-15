import React from 'react'
import './Report.css'
import { StoreContext } from '../context/Context'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const AddReport = () => {
  const navigate = useNavigate()
  const {setSID, report, setReport, student} = useContext(StoreContext)
  const [subject, setSubject] = useState("")
  const [reasonData, setReasonData] = useState("")
  const status= "Request"

  const refresh = () => {
    setSubject("")
    setReasonData("")
  }

  const sid = student[0].Sid
  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/report/add", {sid, subject, reasonData, status})
    .then (result => {
      if(result.data.success) {
        setReport(result.data.data)
        toast.success(result.data.message)
        navigate('/home')
      }
      else{
        toast.error(result.data.message)
      }
    })
    .catch (e => {
      console.log(e)
    })
  }

  return (
    <div className='report-page'>
      <div className='report-card'>
      <form onSubmit={submit} className='report-container'>
        <h3 className='title'>Complaint</h3>
        <div className='report-data-container'>
          {student.map(data => (
          <div className='data-input'>
            <label htmlFor="">Student ID</label>
            <input type="text" name='Sid' value={data.Sid} onChange={(e) => setSID(data.Sid)} placeholder='ex: 240000' required maxLength={6}/>
          </div>
          ))}
          <div className='data-input'>
            <label htmlFor="">Subject</label>
            <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder='ex: Request for change my mobile no.' required/>
          </div>
          <div className='data-input'>
            <label htmlFor="">Reason</label>
            <textarea type="text" name='reasonData' value={reasonData} onChange={(e) => setReasonData(e.target.value)} rows={7} placeholder='Reason type here...' required></textarea>
          </div>
          <div className='btn-container'>
            <button>Submit</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default AddReport
