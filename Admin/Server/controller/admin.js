import mysql from 'mysql'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
})

const adminLogIn = (req, res) => {
  const sql = "SELECT * FROM admin WHERE adminID = ?"
  const adminID = req.body.userID 
  const password = req.body.password
  if (adminID === password) {
    db.query(sql, adminID, (e, data) => {
      if(data.length>0) {
        res.json({success: true, message: "LogIn Successfully", data})
      }
      else {
        res.json({success: false, message: "Invalid Credentials"})
      }
    if(e) return res.json(e)
  })}
  else {
    res.json({success: false, message: "Incorrect Credentials!"})
  }
}

const adminList = (req, res) => {
  const sql = "SELECT * FROM admin"
  db.query(sql, (e, data) => {
    if(e) return res.json(e)
    return res.json(data)
  })
}

export {adminLogIn, adminList}