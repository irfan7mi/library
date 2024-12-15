import mysql from 'mysql'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library",
  multipleStatements: true
})

const addStudent = (req, res) => {
  const sql = "INSERT INTO students (Sid, Name, Mobile, Mail, Dept, College, Year, Book_Status) VALUES (?)"
  const values = [
    req.body.stu_ID,
    req.body.stu_Name,
    req.body.mobile,
    req.body.mail,
    req.body.dept,
    req.body.stu_clg,
    req.body.stu_year,
    req.body.stu_book
  ] 
  if(values){
    db.query(sql, [values], (e, data) => {
      if(e) {
        return res.json({success: false, message: "Student Data Already Exist!"});
        console.log(e)
      }
      return res.json({success: true, message: "Student Added!", data})
  })}
}

const studentLogIn = (req, res) => {
  const sql = "SELECT * FROM students WHERE Sid = ?"
  const studentID = req.body.userID 
  const password = req.body.password
  if (studentID === password) {
    db.query(sql, studentID, (e, data) => {
      if(data.length>0) {
        res.json({success: true, message: "LogIn Successfully", data})
      }
      else {
        res.json({success: false, message: "Student Not Register!"})
      }
    if(e) return res.json(e)
  })}
  else {
    res.json({success: false, message: "Incorrect Credentials!"})
  }
}

const countStudent = (req, res) => {
  const sql = "SELECT COUNT(*) FROM students"
  const bookID = req.params.bookID
  db.query(sql, bookID, (e, data) => {
    if(e) return res.json(e)
    return res.json(data)
  })
}

const studentBookStatus = (req, res) => {
  const stuId = req.body.stuUserId
  const sql = ["SELECT COUNT(*) as issueTotal FROM issue WHERE book_status ='Issued' AND sid =?", "SELECT COUNT(*) as returnTotal FROM issue WHERE book_status ='Returned' AND sid =?",
    "SELECT bookId as returnBook FROM issue WHERE return_date = CURRENT_DATE() AND sid = ? AND book_status ='Issued'"]
  db.query(sql.join(';'),[stuId, stuId, stuId], (e, data) => { 
    if(e) {
        res.json({success: false});
        console.log(e)
    }
    return res.json({success: true, data})
  })
}

const listStudent = (req, res) => {
  const sql = "SELECT * FROM students"
  db.query(sql, (e, data) => {
    if(e) return res.json("Error")
    return res.json(data)
  })
}

const searchStudent = (req, res) => {
  const sid = req.body.stu_ID
  const sql = "SELECT * FROM students WHERE Sid = ?"
  db.query(sql, sid, (e, data) => {
    if(e) return res.json("Error")
    return res.json(data)
  })
}


const findStudent = (req, res) => {
  const sql = "SELECT * FROM students WHERE Sid = ?"
  const sid = req.params.stu_ID
  db.query(sql, sid, (e, data) => {
    if(e) return res.json(e)
    return res.json(data)
  })
}

const updateStudent = (req, res) => {
  const sql = "UPDATE students SET Sid =?, Name=?, Mobile=?, Mail=?, Dept=?, College=?, Year=? WHERE Sid = ?"
  const values = [
    req.body.Sid,
    req.body.Name,
    req.body.Mobile,
    req.body.Mail,
    req.body.Dept,
    req.body.College,
    req.body.Year
  ] 
  const Sid = req.params.Sid
  db.query(sql, [...values, Sid], (e) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    return res.json({success: true, message: "Student Updated!"})
  })
}

const deleteStudent = (req, res) => {
  const sql = "DELETE FROM students WHERE Sid = ?"
  const sid = req.params.stu_ID
  db.query(sql, sid, (e, data) => {
    if(e) {
      res.json({success: false, message: "Error!"});
      console.log(e)
  }
  return res.json({success: true, message: "Student Removed!", data})
  })
}

const studentMyBook = (req, res) => {
  const sid = req.body.stuUserId
  const sql = ["SELECT bookId, book_status, issue_date, return_date, (cast(CURRENT_DATE() as date) - cast(return_date as date) + fine) * 2 as fine FROM issue WHERE sid = ? AND return_date < CURRENT_DATE()", 
  "SELECT * FROM issue WHERE sid = ? AND return_date >= CURRENT_DATE()"]
  db.query(sql.join(';'), [sid, sid],  (e, data) => {
    if(e) {
      res.json({success: false});
      console.log(e)
  }
  return res.json({success: true, data})
  })
}

export {addStudent, studentLogIn, countStudent, studentBookStatus, listStudent, searchStudent, findStudent, updateStudent, deleteStudent, studentMyBook}