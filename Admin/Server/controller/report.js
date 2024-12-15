import mysql from 'mysql'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
})

const addReport = (req, res) => {
  const sql = "INSERT INTO report (sid, subject, reason, status) VALUES (?)"
  const values = [
    req.body.sid,
    req.body.subject,
    req.body.reasonData,
    req.body.status
  ]
  db.query(sql, [values], (e, data) => {      
    if(e) return res.json("Error")
    return res.json({success: true, message: "Submitted!", data})
  })
}


const listReport = (req, res) => {
  const sql = "SELECT * FROM report WHERE status= 'Request'"
  db.query(sql, (e, data) => {
    if(e) return res.json("Error")
    return res.json(data)
  })
}

const updateReport = (req, res) => {
  const sql = "UPDATE report SET status = ? WHERE reportID = ?"
  const status = req.body.status
  const rid = req.body.rid
  db.query(sql, [status, rid], (e, data) => {
    if(e) {
        res.json({success: false, message: "Error!"});
        console.log(e)
    }
    return res.json({success: true, message: "Submitted!", data})
  })
}

const countReport = (req, res) => {
  const sql = "SELECT COUNT(*) FROM report WHERE status = 'Request' AND sid= ?"
  const sid = req.body.stuUserId
  db.query(sql, sid, (e, data) => {
    if(e) {
        res.json({success: false});
        console.log(e)
    }
    return res.json({success: true, data})
  })
}

export {addReport, listReport, updateReport, countReport}