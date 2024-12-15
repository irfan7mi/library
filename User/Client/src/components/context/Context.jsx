import { useState } from "react"
import { createContext } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
  const [stuUserId, setStuUserId] = useState("")
  const [stuRemainder, setStuRemainder] = useState([])
  const [dept, setDept] = useState("")
  const [stu_year, setStu_Year] = useState("")
  const [stuIssues, setStuIssues] = useState([])
  const [stuReturns, setStuReturns] = useState([])
  const [student, setStudent] = useState([])
  const [showLogIn, setShowLogIn] = useState(true)
  const [stu_ID, setSID] = useState("")
  const [reportCount, setRepCount] = useState()
  const [report, setReport] = useState([])

  const contextValue = {
    stuUserId, setStuUserId,
    stuIssues, setStuIssues,
    stuReturns,
    setStuReturns,
    stuRemainder, setStuRemainder,
    student, setStudent,
    showLogIn, setShowLogIn,
    stu_ID, setSID,
    dept, setDept,
    stu_year, setStu_Year,
    report, setReport,
    reportCount, setRepCount
  }

  return(
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider