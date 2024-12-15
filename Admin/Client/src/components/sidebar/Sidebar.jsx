import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import CampaignIcon from '@mui/icons-material/Campaign';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import ReportIcon from '@mui/icons-material/Report';
import OutboxIcon from '@mui/icons-material/Outbox';

const Sidebar = () => {
  const [current, setCurrent] = useState("home")

  return (
    <div className='sidebar-container'>
      <div className='option-container'>
        <Link to={'/home'} className={current=="home" ? 'active option' : 'option'} onClick={() => setCurrent("home")}><HomeIcon/> HOME</Link>
        <Link to={'/book/add'} className={current=="addBook" ? 'active option' : 'option'} onClick={() => setCurrent("addBook")}><AddCircleIcon/> ADD BOOKS</Link>
        <Link to={'/books'} className={current=="book" ? 'active option' : 'option'} onClick={() => setCurrent("book")}><MenuBookIcon/> BOOKS</Link>
        <Link to={'/student/add'} className={current=="addStudent" ? 'active option' : 'option'} onClick={() => setCurrent("addStudent")}><AddCircleIcon/> ADD STUDENTS</Link>
        <Link to={'/students'} className={current=="student" ? 'active option' : 'option'} onClick={() => setCurrent("student")}><LocalLibraryIcon/> STUDENTS</Link>
        <Link to={'/book/issue'} className={current=="issueBook" ? 'active option' : 'option'} onClick={() => setCurrent("issueBook")}><OutboxIcon/> ISSUE BOOK</Link>
        <Link to={'/curriculam'} className={current=="curriculam" ? 'active option' : 'option'} onClick={() => setCurrent("curriculam")}><SchoolIcon/> CURRICULAM</Link>
        <Link to={'/announcement/add'} className={current=="announcement" ? 'active option' : 'option'} onClick={() => setCurrent("announcement")}><CampaignIcon/> ANNOUNCEMENT</Link>
        <Link to={'/report'} className={current=="report" ? 'active option' : 'option'} onClick={() => setCurrent("report")}><ReportIcon/> REPORTS</Link>
      </div>
    </div>
  )
}

export default Sidebar