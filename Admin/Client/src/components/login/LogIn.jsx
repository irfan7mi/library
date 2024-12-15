import React, { useState } from 'react'
import './LogIn.css'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../context/Context'
import axios from 'axios'
import { toast } from 'react-toastify'

const LogIn = () => {
  const {setShowLogIn, setAdmin} = useContext(StoreContext)
  const navigate = useNavigate()
  const [userID, setUserId] = useState()
  const [password, setPassword] = useState()

  const submit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:4000/admin/login", {userID, password})
    .then(result => {
      if(result.data.success) {
        setAdmin(result.data.data)
        toast.success(result.data.message)
        navigate('/home')
        setShowLogIn(false)
      }
      else {
        toast.error(result.data.message)
      }
    })
    .catch(e => {
      console.log(e)
    })
  }

  return (
    <div className='login-container'>
      <form className='login-form-container' onSubmit={submit}>
        <h3>LogIn</h3>
        <div className='login-form'>
          <label htmlFor="">UserID</label>
          <input type="text" name='username' onChange={(e) => setUserId(e.target.value)} required maxLength={5} />
        </div>
        <div className='login-form'>
          <label htmlFor="">Password</label>
          <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} required maxLength={5}/>
        </div>
        <button>LogIn</button>
      </form>
    </div>
  )
}

export default LogIn
