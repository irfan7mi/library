import { useContext } from 'react'
import './App.css'
import Add from './components/add/Add'
import AddStudent from './components/addStudent/Add'
import Books from './components/books/Books'
import Home from './components/home/Home'
import LogIn from './components/login/LogIn'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { StoreContext } from './components/context/Context'
import UpdateBook from './components/books/UpdateBook'
import Curriculam from './components/curriculam/Curriculam'
import Announcement from './components/announcement/Announcement'
import Report from './components/report/Report'
import IssueBook from './components/issueBook/IssueBook'
import Students from './components/students/Students'
import UpdateStudents from './components/students/UpdateStudents'

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
            <Route path='/book/add' element={<Add/>}></Route>
            <Route path='/books' element={<Books/>}></Route>
            <Route path='/book/:id' element={<UpdateBook/>}></Route>
            <Route path='/book/issue' element={<IssueBook/>}></Route>
            <Route path='/students' element={<Students/>}></Route>
            <Route path='/student/:id' element={<UpdateStudents/>}></Route>
            <Route path='/student/add' element={<AddStudent/>}></Route>
            <Route path='/curriculam' element={<Curriculam/>}></Route>
            <Route path='/announcement/add' element={<Announcement/>}></Route>
            <Route path='/report' element={<Report/>}></Route>
          </Routes>
        </div>
      </>}
    </div>
  )
}

export default App
