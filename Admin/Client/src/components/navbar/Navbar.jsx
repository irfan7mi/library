import React from 'react'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../context/Context'

const Navbar = () => {
  const {setShowLogIn, admin} = useContext(StoreContext)
  const navigate = useNavigate()

  return (
    <div className='navbar-container'>
      <div className='profile-container'>
        {admin.map((data) => (
          <>
            <div className='profile-img'>{data.name[0]}</div>
            <div className='account-profile'>
              <h3>{data.name}</h3>
            </div>
          </>
        ))}
      </div>
      <button className='login-btn' onClick={() => {navigate('/'); setShowLogIn(true)}}>SignUp</button>
    </div>
  )
}

export default Navbar