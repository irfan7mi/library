import React, { useState } from 'react'
import './Report.css'
import { useContext } from 'react'
import { StoreContext } from '../context/Context'
import { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Report = () => {
  const {report, setReport} = useContext(StoreContext)
    
  const fetchList = async () => {
    const response = await axios.get("http://localhost:4000/report/list")
    setReport(response.data)
  }

  useEffect(() => {
    async function loadData() {
      await fetchList()
    }
    loadData()
  }, [])

  const statusHandler = async (e, rid) => {
    const response = await axios.post("http://localhost:4000/report/update/status", {rid, status: e.target.value})
    if (response.data.success) {
      toast.success(response.data.message)
      console.log(response.data.data)
    } 
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='report-page'>
      <div className='report-card'>
      <div className='report-list-container'>
      <h3 className='report-list-title'>Report List</h3>
      <table className='report-list-table'>
        <thead>
          <th>Student ID</th>
          <th>Subject</th>
          <th>Reason</th>
          <th>Status</th>
          <th>Date</th>
        </thead>
        <tbody>
        {report.map((list) => {
          return (
          <tr>
            <td>{list.sid}</td>
            <td>{list.subject}</td>
            <td>{list.reason}</td>
            <td>
              <select onChange={(e) => {statusHandler(e, list.reportID)}} >
                <option value="Request">Request</option>
                <option value="Solved">Solved</option>
              </select>
            </td>
            <td>{list.date}</td>
         </tr>
        )})}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default Report