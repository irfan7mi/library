import React, { useContext, useEffect, useState } from 'react'
import './Books.css'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import {toast} from 'react-toastify'

const Books = () => {
  const [book, setBook] = useState([])
 const [bid, setBId] = useState("")

  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/book/search", {bid})
    .then (result => {
      setBook(result.data)
      refresh()
    })
    .catch (e => {
      console.log(e)
    })
  }

  const fetchBookList = async () => {
    const response = await axios.get("http://localhost:4000/book/list")
    setBook(response.data)
  }

  useEffect(() => {
    async function loadData() {
      await fetchBookList()
    }
    loadData()
  }, [])

  const deleteHandler = async (id) => {
    const response = await axios.delete("http://localhost:4000/book/delete/"+id)
    if (response.data.success){
      toast.success(response.data.message)
      await fetchBookList()
    }
    else{
      toast.error(response.data.message)
    }
  }

  return (
    <div className='book-list-container'>
      <form className='search-container' onSubmit={submit}>
        <input type="text" placeholder='Enter the bookId...' value={bid} onChange={(e) => setBId(e.target.value)}/>
        <button >Search</button>
      </form>
      <h3 className='book-list-title'>Book List</h3>
      <table className='book-list-table'>
        <thead>
          <th>BID</th>
          <th className='book-name-heading'>Book Name</th>
          <th>AuthName</th>
          <th>Category</th>
          <th>Pub.Year</th>
          <th>RackNo</th>
          <th>Floor</th>
          <th>Action</th>
        </thead>
        <tbody>
        {book.map((data, index) => (
          <tr key={index}>
            <td>{data.bookID}</td>
            <td className='book-name-heading'>{data.bookName}</td>
            <td>{data.authorName}</td>
            <td>{data.category}</td>
            <td>{data.year}</td>
            <td>{data.rackNo}</td>
            <td>{data.floor}</td>
            <td className='btn-container'><Link to={`/book/${data.bookID}`} className='update-btn'>UPDATE</Link><button className='delete-btn' onClick={(e) => deleteHandler(data.bookID)}>REMOVE</button></td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
