import React, { useContext, useEffect, useState } from 'react'
import './Students.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import { StoreContext } from '../context/Context'

const Students = () => {
  const [student, setStudent] = useState([])
  const { stu_ID, setSID } = useContext(StoreContext)

  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/student/search", {stu_ID})
    .then (result => {
      setStudent(result.data)
      setSID("")
    })
    .catch (e => {
      console.log(e)
    })
  }

  const fetchStudentList = async () => {
    const response = await axios.get("http://localhost:4000/student/list")
    setStudent(response.data)
  }

  useEffect(() => {
    async function loadData() {
      await fetchStudentList()
    }
    loadData()
  }, [])

  const deleteHandler = async (id) => {
    const response = await axios.delete("http://localhost:4000/student/delete/"+id)
    if (response.data.success){
      toast.success(response.data.message)
      console.log(response.data.data)
      await fetchStudentList()
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='students-list-container'>
      <form className='students-search-container' onSubmit={submit}>
        <input type="text" placeholder='Enter the student Id...' value={stu_ID} onChange={(e) => setSID(e.target.value)}/>
        <button >Search</button>
      </form>
      <h3 className='students-list-title'>Student List</h3>
      <table className='students-list-table'>
        <thead>
          <th>SID</th>
          <th>SName</th>
          <th>Moble</th>
          <th>Email</th>
          <th>Department</th>
          <th>College</th>
          <th>Year</th>
          <th>Book_Status</th>
          <th>Action</th>
        </thead>
        <tbody>
        {student.map((data, index) => (
          <tr key={index}>
            <td>{data.Sid}</td>
            <td>{data.Name}</td>
            <td>{data.Mobile}</td>
            <td>{data.Mail}</td>
            <td>{data.Dept}</td>
            <td>{data.College}</td>
            <td>{data.Year}</td>
            <td>{data.Book_status}</td>
            <td className='students-btn-container'><Link to={`/student/${data.Sid}`} className='update-btn'>UPDATE</Link><button className='delete-btn' onClick={(e) => deleteHandler(data.Sid)}>REMOVE</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Students
