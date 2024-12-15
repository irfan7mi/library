import React, { useContext } from 'react'
import './Curriculam.css'
import axios from 'axios'
import { StoreContext } from '../context/Context'
import { useEffect } from 'react'
import { useState } from 'react'

const Curriculam = () => {
  const [setBook] = useState([])
  const [data, setData] = useState([])
  const [showList, setShowList] = useState(false)
  const {dept, setDept, stu_year, setStu_Year} = useContext(StoreContext)

  const refresh = () => {
    setDept("")
    setStu_Year("")
  } 

  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/curriculam/find", {dept, stu_year})
    .then (result => {
      setData(result.data)
      refresh()
      setShowList(true)
    })
    .catch (e => {
      console.log(e)
    })
  }
  console.log(data)
  useEffect(() => {
    axios.get("http://localhost:4000/curriculam/list")
    .then(result => setBook(result.data))
    .catch(e => console.log(e))
  }, [])

  return (
    <div className='curriculam-list-container'>
      <div className="card-curriculam">
      <form className='dept-year-container' onSubmit={submit}>
        <div className='input-container'>
          <label htmlFor="">Dept</label>
          <input type="text" className='dept-input' value={dept} name='department' onChange={(e) => setDept(e.target.value)} required/>
        </div>
        <div className='input-container'>
          <label htmlFor="">Year</label>
          <input type="text" className='year-input' name='year' value={stu_year} onChange={(e) => setStu_Year(e.target.value)} required/>
        </div>
        <button>Submit</button>
      </form>

      {!showList ? <></> :
      <> 
      <h3 className='curriculam-book-list-title'>Book List</h3>
      <table className='curriculam-book-list-table'>
        <thead>
          <th>BID</th>
          <th>Department</th>
          <th>Year</th>
          <th>College Name</th>
        </thead>
        <tbody>
        {data.map((data) => (
          <tr >
            <td>{data.bookID}</td>
            <td>{data.department}</td>
            <td>{data.year}</td>
            <td>{data.college}</td>
         </tr>
        ))}
        </tbody>
      </table>
      </> }
      </div>
    </div>
  )
}

export default Curriculam 