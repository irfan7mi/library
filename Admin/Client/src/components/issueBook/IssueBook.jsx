import React from 'react'
import './IssueBook.css'
import { StoreContext } from '../context/Context'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'

const IssueBook = () => {
  const {stu_ID, setSID, bookID, setBid} = useContext(StoreContext)
  const status= "Issued"
  const [fine, setFine] = useState("")
  const [fineStuId, setFineStuId] = useState("")
  const [showFine, setShowFine] = useState(false)
  const [data, setData] = useState([])
  const [returnSID, setReturnStuID] = useState("")
  const [returnBID, setReturnBID] = useState("")
  const [fineSum, setFineSum] = useState("")

  const refresh = () => {
    setFineStuId("")
    setBid("")
    setFine("")
  }

  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/book/issue", {fineStuId, bookID, status, fine})
    .then (result => {
      if(result.data.success) {
        refresh()
        toast.success(result.data.message)
      }
      else{
        toast.error(result.data.message)
      }
    })
    .catch (e => {
      console.log(e)
    })
  }
  
  const returnBook = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/book/return", {returnSID, returnBID})
    .then (result => {
      if(result.data.success) {
        refresh()
        toast.success(result.data.message)
      }
      else{
        toast.error(result.data.message)
      }
    })
    .catch (e => {
      console.log(e)
    })
  }

  const search = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/book/issue/fine", {stu_ID})
    .then (result => {
      if(result.data.success) {
        setData(result.data.data[0])
        setFineSum(result.data.data[1])
        setSID("")
        setShowFine(true)
      }
      else{
        toast.error(result.data.message)
      }
    })
    .catch (e => {
      console.log(e)
    })
  }
  console.log(fineSum)
  return (
    <div className='issue-page'>
      <div className='issue-card'>
      <div className='issue-return-container'>
        <form onSubmit={submit} className='issue-container'>
          <h3 className='title'>Issue Book</h3>
          <div className='issue-return-data-container'>            
            <input type="text" name='stu_ID' placeholder='Student ID' value={fineStuId} onChange={(e) => setFineStuId(e.target.value)} required maxLength={6}/>
            <input type="text" name="bookId" placeholder='Book ID' value={bookID} onChange={(e) => setBid(e.target.value)} required/>
            <input type="text" name="fine" placeholder='Fine' value={fine} onChange={(e) => setFine(e.target.value)} required/>
            <div className='issue-book-btn-container'>
              <button>Submit</button>
            </div>
          </div>
        </form>
        <div className='return-container'>
          <h4>Return Book</h4>
          <form className='issue-return-data-container' onSubmit={returnBook}>
            <input type="text" name='stu_ID' placeholder='Student ID' value={returnSID} onChange={(e) => setReturnStuID(e.target.value)} required maxLength={6}/>
            <input type="text" name="bookId" placeholder='Book ID' value={returnBID} onChange={(e) => setReturnBID(e.target.value)} required maxLength={6}/>
            <div className='issue-book-btn-container'>
              <button>Submit</button>
            </div>
          </form>
        </div>
      </div>
      
      <div className='fine-container'>
        <div className="fine-check-container">
          <h4 className='fine-check-text'>Fine Check</h4>
          <form className='input-data-container' onSubmit={search}>
            <input type="text" value={stu_ID} onChange={(e) => setSID(e.target.value)} required maxLength={6} placeholder='Enter Student ID...'/>
            <button>Search</button>
          </form>
          {showFine ?
          <table className='fine-details-table'>
            <thead>
              <th>Book ID</th>
              <th>Fine</th>
            </thead>
            <tbody>
            {data.map((list, index) => (
              <tr key={index}>
                <td>{list.bookId}</td>
                <td>{list.fine}</td>
              </tr>
            ))}
            {fineSum.map(data => ( (data.totalFine > 0) ? <p className='total-fine'>Total Fine ₹{data.totalFine}</p>
            : <p className='total-fine'>Total Fine ₹0</p>))}
            </tbody>
          </table>
          : <></>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default IssueBook
