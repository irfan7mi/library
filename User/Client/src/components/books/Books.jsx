import React, { useContext, useEffect, useState } from 'react'
import './Books.css'
import axios from 'axios'
import {toast} from 'react-toastify'

const Books = () => {
  const [book, setBook] = useState([])
  const [bid, setBid] = useState("")

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

  useEffect(() => {
    axios.get("http://localhost:4000/book/list")
    .then(result => setBook(result.data))
    .catch(e => console.log(e))
  }, [])

  const deleteHandler = (id) => {
    axios.delete("http://localhost:4000/book/delete/"+id)
    .then(result => {
      toast.success(result.data.message)
    })
    .catch(e => console.log(e))
  }

  return (
    <div className='book-list-container'>
      <form className='search-container' onSubmit={submit}>
        <input type="text" placeholder='Enter the bookId...' value={bid} maxLength={6} onChange={(e) => setBid(e.target.value)}/>
        <button >Search</button>
      </form>
      <h3 className='book-list-title'>Book List</h3>
      <table className='book-list-table'>
        <thead>
          <th>BID</th>
          <th>BName</th>
          <th>AuthName</th>
          <th>Category</th>
          <th>Pub.Year</th>
          <th>RackNo</th>
          <th>Floor</th>
        </thead>
        <tbody>
        {book.map((data, index) => (
          <tr key={index}>
            <td>{data.bookID}</td>
            <td>{data.bookName}</td>
            <td>{data.authorName}</td>
            <td>{data.category}</td>
            <td>{data.year}</td>
            <td>{data.rackNo}</td>
            <td>{data.floor}</td>
         </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
