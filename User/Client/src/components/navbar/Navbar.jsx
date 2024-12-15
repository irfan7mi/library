import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../context/Context'

const Navbar = () => {
  const {setShowLogIn, student, stuRemainder} = useContext(StoreContext)
  const navigate = useNavigate()
  
  return (
    <div className='navbar-container'>
      <div className='profile-container'>
        {student.map((data) => (
          <>
            <div className='profile-img'>{data.Name[0]}</div>
            <div className='account-profile'>
              <h3>{data.Name}</h3>
              <p>Student ID: {data.Sid}</p>
            </div>
          </>
        ))}
      </div>
      {stuRemainder.map(data => (<h4 className='remainter-text'>Remainder: BookID ({data.returnBook}) return date today...!</h4>))}
      <button className='login-btn' onClick={() => {navigate('/'); setShowLogIn(true)}} >SignUp</button>
    </div>
    )
}

export default Navbar