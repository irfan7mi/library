import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleIcon from '@mui/icons-material/People';
import BackpackIcon from '@mui/icons-material/Backpack';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
import { StoreContext } from '../context/Context';

const Home = () => {
  const {report, setReport} = useContext(StoreContext)
  const [bookCount, setBookCount] = useState()
  const [stuCount, setStuCount] = useState()
  const [admin, setAdmin] = useState([])
  const [issueBook, setIssueBook] = useState([])
  const [data, setData] = useState([])
  const [issueCount, setIssueCount] = useState([])
  const [returnCount, setReturnCount] = useState([])
  useEffect(() => {
    axios.get("http://localhost:4000/admin/list")
    .then(result => setAdmin(result.data))
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/book/issue/list")
    .then(result => setIssueBook(result.data))
    .catch(e => console.log(e))
  }, [])
 
  useEffect(() => {
    axios.get("http://localhost:4000/book/count")
    .then(result => {
      setBookCount(result.data[0]["COUNT(*)"])
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/book/issue/count")
    .then(result => {
      setIssueCount(result.data[0])
      setReturnCount(result.data[1])
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/student/count")
    .then(result => {
      setStuCount(result.data[0]["COUNT(*)"])
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/announcement/data")
    .then(result => {
      setData(result.data[0])
    })
    .catch(e => console.log(e))
  }, [])

  useEffect(() => {
    axios.get("http://localhost:4000/report/list")
    .then(result => setReport(result.data))
    .catch(e => console.log(e))
  }, [])

  return (
    <div className='home-container'>
      <div className="card">
        <div className="visitors-books-details">
          <div className="count-details">
            <AutoStoriesIcon className='icon'/>
            <div className="text-container">
              <h4>{bookCount}</h4>
              <p>BOOKS</p>
            </div>
          </div>
          <div className="count-details">
            <PeopleIcon className='icon'/>
            <div className="text-container">
              <h4>{stuCount}</h4>
              <p>STUDENTS</p>
            </div>
          </div>
          <div className="count-details">
            <BookIcon className='icon'/>
            <div className="text-container">
              {issueCount.map(data => (<h4>{data.issueTotal}</h4>))}
              <p>ISSUE BOOK</p>
            </div>
          </div>
          <div className="count-details">
            <BackpackIcon className='icon'/>
            <div className="text-container">
              {returnCount.map(data => (<h4>{data.returnTotal}</h4>))}
              <p>RETURN BOOK</p>
            </div>
          </div>
        </div>
        <div className="admin-active-details">
          <div className="admin-details">
            <h3>Admin Details</h3>
            <table className='admin-details-table'>
              <thead>
                <th>Admin ID</th>
                <th>Name</th>
                <th>Contact</th>
              </thead>
              <tbody>
              {admin.map((list, index) => (
                <tr key={index}>
                  <td>{list.adminID}</td>
                  <td>{list.name}</td>
                  <td>{list.mobile}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          <div className="book-status">
            <h3>Book Status</h3>
            <table className='book-status-table'>
              <thead>
                <th>Book ID</th>
                <th>Status</th>
              </thead>
              <tbody>
              {issueBook.map((list, index) => (
                <tr key={index}>
                  <td>{list.bookId}</td>
                  <td>{list.book_status}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='announcements-container'>
          <div className='announcement-img-container'>
            <div className='announcement-title-container'>
              {data ? <img src={'http://localhost:4000/images/'+data.image} alt="" /> : <></>}
              <h1>ANNOUNCEMENT!</h1>
            </div>
            {data ? <h4>{data.contents}</h4> : <></>}
          </div>
          <div className="reports-status">
            <h4>Complaints</h4>
            <div className='reports-details-container'>
              {report.map((list, index) => { 
                return(
                <div className='report-content'>
                <h5 key={index}>Student ID: {list.sid}</h5>
                <p>{list.subject}</p>
                </div>
              )})}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
