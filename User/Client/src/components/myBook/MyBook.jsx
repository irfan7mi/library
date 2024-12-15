import React, { useContext, useEffect, useState } from 'react'
import './MyBook.css'
import axios from 'axios'
import { StoreContext } from '../context/Context'

const MyBook = () => {
  const {student, stu_ID, setSID, stuUserId} = useContext(StoreContext)
  const [fineBook, setFineBook] = useState([])
  const [book, setBook] = useState([])
  const [showList, setShowList] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/student/mybook", {stuUserId})
    .then (result => {
      setBook(result.data.data[1])
      setFineBook(result.data.data[0])
      setShowList(true)
    })
    .catch (e => {
      console.log(e)
    })
  }

  return (
    <div className='book-list-container'>
      {student.map(data => (
      <form className='search-container' onSubmit={submit}>
        <input type="text" value={data.Sid} onChange={(e) => setSID(data.Sid)} placeholder='Enter the bookId...' maxLength={6}/>
        <button >Search</button>
      </form>
      ))}
      {showList ? 
      <>
      <h3 className='book-list-title'>Book List</h3>
      <table className='book-list-table'>
        <thead>
          <th>BookID</th>
          <th>Issue_Date</th>
          <th>Return_Date</th>
          <th>Book_Status</th>
          <th>Fine</th>
        </thead>
        <tbody>
        {fineBook.map((data, index) => (
          <tr key={index}>
            <td>{data.bookId}</td>
            <td>{data.issue_date}</td>
            <td>{data.return_date}</td>
            <td>{data.book_status}</td>
            <td>{data.fine}</td>
         </tr>
        ))}
        {book.map((data, index) => (
          <tr key={index}>
            <td>{data.bookId}</td>
            <td>{data.issue_date}</td>
            <td>{data.return_date}</td>
            <td>{data.book_status}</td>
            <td>{data.fine}</td>
         </tr>
        ))}
        </tbody>
      </table>
      </> : <></>}
    </div>
  )
}

export default MyBook
