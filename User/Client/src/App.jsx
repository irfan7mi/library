import { useContext } from 'react'
import './App.css'
import Books from './components/books/Books'
import Home from './components/home/Home'
import LogIn from './components/login/LogIn'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoreContext } from './components/context/Context'
import Curriculam from './components/curriculam/Curriculam'
import AddReport from './components/report/AddReport'
import MyBook from './components/myBook/MyBook'

function App() {
  const {showLogIn} = useContext(StoreContext)
  return (
    <div>
      <ToastContainer/>
      {showLogIn ?
      <LogIn/> :
      <>
        <Navbar/>
        <div className='app-content'>
          <Sidebar/>
          <Routes>
            <Route path='/home' element={<Home/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/books/mybook' element={<MyBook/>}></Route>
            <Route path='/curriculam' element={<Curriculam/>}></Route>
            <Route path='/report/add' element={<AddReport/>}></Route>
          </Routes>
        </div>
      </>}
    </div>
  )
}

export default App
