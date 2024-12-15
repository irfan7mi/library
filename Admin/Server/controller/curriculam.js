import mysql from 'mysql'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
})

const addCurriculam = (req, res) => {
  const sql = "INSERT INTO curriculam (bookID, college, department, year) VALUES (?)"
  const values = [
    req.body.bookID,
    req.body.stu_clg,
    req.body.dept,
    req.body.stu_year
  ]
  db.query(sql, [values], (e, data) => {
    if(e) {
      res.json({success: false, message: "Error!"});
      console.log(e)
  }
  return res.json({success: true, message: "Added!", data})
  })
} 

const findCurriculam = (req, res) => {
  const dept = req.body.dept 
  const year =  req.body.stu_year
  const sql = "SELECT * FROM curriculam WHERE department=? AND year=?"
  db.query(sql, [dept, year], (e, data) => {
    if(e) return res.json("Erro1r")
    return res.json(data)
  })
}

const listCurriculam = (req, res) => {
  const sql = "SELECT * FROM books"
  db.query(sql, (e, data) => {
    if(e) return res.json("Error")
    return res.json(data)
  })
}

export {addCurriculam, findCurriculam, listCurriculam}