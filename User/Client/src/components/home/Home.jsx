import React, { useEffect, useState } from 'react'
import './Home.css'
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleIcon from '@mui/icons-material/People';
import BackpackIcon from '@mui/icons-material/Backpack';
import BookIcon from '@mui/icons-material/Book';
import axios from 'axios';
import ReportIcon from '@mui/icons-material/Report';
import { useContext } from 'react';
import { StoreContext } from '../context/Context';

const Home = () => {
  const [bookCount, setBookCount] = useState()
  const [data, setData] = useState([])
  const {stuIssues, stuReturns, reportCount} = useContext(StoreContext)

  useEffect(() => {
    axios.get("http://localhost:4000/book/count")
    .then(result => {
      setBookCount(result.data[0]["COUNT(*)"])
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
  console.log(reportCount)
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
            <BookIcon className='icon'/>
            <div className="text-container">
              {stuIssues.map(data => (<h4>{data.issueTotal}</h4>))}
              <p>ISSUE BOOK</p>
            </div>
          </div>
          <div className="count-details">
            <BackpackIcon className='icon'/>
            <div className="text-container">
              {stuReturns.map(data => (<h4>{data.returnTotal}</h4>))}
              <p>RETURN BOOK</p>
            </div>
          </div>
          <div className="count-details">
            <ReportIcon className='icon'/>
            <div className="text-container">
              <h4>{reportCount}</h4>
              <p>REPORTS</p>
            </div>
          </div>
        </div>
        <div className='announcement-container'>
          {data ? 
          <div className='announcement-img-container'>
            <img src={'http://localhost:4000/images/'+data.image} alt="" />
          </div>
          : <></>}
          {data ? <div className='announcement-content-container'><h4>{data.contents}</h4></div> : <></>}
        </div>
      </div>
    </div>
  )
}

export default Home
