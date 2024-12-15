import React from 'react'
import './Sidebar.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SchoolIcon from '@mui/icons-material/School';
import ReportIcon from '@mui/icons-material/Report';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

const Sidebar = () => {
  const [current, setCurrent] = useState("home")

  return (
    <div className='sidebar-container'>
      <div className='option-container'>
        <Link to={'/home'} className={current=="home" ? 'active option' : 'option'} onClick={() => setCurrent("home")}><HomeIcon/> HOME</Link>
        <Link to={'/books'} className={current=="book" ? 'active option' : 'option'} onClick={() => setCurrent("book")}><MenuBookIcon/> BOOKS</Link>
        <Link to={'/books/mybook'} className={current=="mybook" ? 'active option' : 'option'} onClick={() => setCurrent("mybook")}><LocalLibraryIcon/> MY BOOK</Link>
        <Link to={'/curriculam'} className={current=="curriculam" ? 'active option' : 'option'} onClick={() => setCurrent("curriculam")}><SchoolIcon/> CURRICULAM</Link>
        <Link to={'/report/add'} className={current=="report" ? 'active option' : 'option'} onClick={() => setCurrent("report")}><ReportIcon/> REPORTS</Link>
      </div>
    </div>
  )
}

export default Sidebar
