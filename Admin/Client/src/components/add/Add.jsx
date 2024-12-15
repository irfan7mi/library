import React from 'react'
import './Add.css'
import axios from 'axios'
import { useState } from 'react'
import {toast} from 'react-toastify'


const Add = () => {
  const [data, setData] = useState({
    bookID: "", 
    bookName: "", 
    authorName: "", 
    category: "",
    year: "", 
    rackNo: "", 
    floor: ""
  })

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const Submit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:4000/book/add", data)
    if (response.data.success) {
      setData({
        bookID: "", 
        bookName: "", 
        authorName: "", 
        category: "",
        year: "", 
        rackNo: "", 
        floor: ""
      })   
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
  }
  
  return (
    <div className='add-book-container'>
      <form onSubmit={Submit} className='add-card'>
      <h3 className='add-book-title'>Add Book</h3>
        <div className='bid-name-author'>
          <div>
            <label htmlFor="">Book ID</label>
            <input type="text" name='bookID' value={data.bookID} onChange={eventHandler} required maxLength={6}/>
          </div>
          <div>
            <label htmlFor="">Book Name</label>
            <input type="text" name="bookName" value={data.bookName} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">Author Name</label>
            <input type="text" name='authorName' value={data.authorName} onChange={eventHandler} required/>
          </div>
        </div>
        <div className='category-year-place'>
          <div>
            <label htmlFor="">Category</label>
            <input type="text" name='category' value={data.category} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">Publish Year</label>
            <input type="text" name="year" value={data.year} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">Rack No</label>
            <input type="text" className='rack-input' name='rackNo' value={data.rackNo} onChange={eventHandler} required/>
          </div>
          <div>
            <label htmlFor="">Floor</label>
            <input type="text" className='floor-input' name='floor' value={data.floor} onChange={eventHandler}/>
          </div>
        </div>
        <div className='btn-container'>
          <button className='submit-btn'>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Add 