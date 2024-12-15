import React, { useEffect, useState } from 'react'
import './Books.css'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const UpdateBook = () => {
  const {id} = useParams()
  const [data, setData] = useState([])
 const navigate = useNavigate()

 const fetchFoodList = async () => {
  const response = await axios.get("http://localhost:4000/book/find/"+id)
  setData(response.data[0])
  }

  useEffect(() => { 
    async function loadData() {
      await fetchFoodList()
    }
    loadData()
  },[])

  const eventHandler = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData(data => ({...data, [name]:value}))
  }

  const Submit = async (e) => {
    e.preventDefault()
    const response = await axios.post("http://localhost:4000/book/update/"+id, data)
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
      navigate('/books')
    }
    else{
      toast.error(response.data.message)
    }
  }
  
  return (
    <div className='update-container'>
    
    <form className='add-card' onSubmit={Submit}>
    <h3 className='add-book-title'>Add Book</h3>
      <div className='bid-name-author'>
        <div>
          <label htmlFor="">Book ID</label>
          <input type="text" name='bookID' value={data.bookID} onChange={eventHandler}/>
        </div>
        <div>
          <label htmlFor="">Book Name</label>
          <input type="text" name='bookName'  value={data.bookName} onChange={eventHandler}/>
        </div>
        <div>
          <label htmlFor="">Author Name</label>
          <input type="text" name='authorName' value={data.authorName} onChange={eventHandler}/>
        </div>
      </div>
      <div className='category-year-place'>
        <div>
          <label htmlFor="">Category</label>
          <input type="text" name='category' value={data.category} onChange={eventHandler}/>
        </div>
        <div>
          <label htmlFor="">Publish Year</label>
          <input type="text" value={data.year} name='year' onChange={eventHandler}/>
        </div>
        <div>
          <label htmlFor="">Rack No</label>
          <input type="text" className='rack-input' name='rackNo' value={data.rackNo} onChange={eventHandler}/>
        </div>
        <div>
          <label htmlFor="">Floor</label>
          <input type="text" className='floor-input' name='floor' value={data.floor} onChange={eventHandler}/>
        </div>
      </div>
      <div className='btn-container'>
        <button className='submit-btn' >SUBMIT</button>
      </div>
    </form>

  </div>
  )
}

export default UpdateBook
