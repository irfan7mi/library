import { useState } from "react"
import { createContext } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [admin, setAdmin] = useState([])
  const [showLogIn, setShowLogIn] = useState(true)
  const [bookID, setBid] = useState("")
  const [stu_ID, setSID] = useState("")
  const [report, setReport] = useState([])

  const contextValue = {
    admin,
    setAdmin,
    showLogIn,
    setShowLogIn,
    bookID,
    setBid,
    stu_ID, 
    setSID,
    report, 
    setReport
  }

  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider