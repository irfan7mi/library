import mysql from 'mysql'

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
})

const addAnnouncement = (req, res) => {
  const sql = "INSERT INTO announcement (image, contents) VALUES (?)"
  const values = [
    req.file.filename,
    req.body.content
  ]
  db.query(sql, [values], (e, data) => { 
    if(e) {
      res.json({success: false, message: "Error!"});
      console.log(e)
    }
    else {
      console.log(data)
      res.json({success: true, message: "Added!", data})
    }
  })
}

const dataAnnouncement = (req, res) => {
  const sql = "SELECT * FROM announcement ORDER BY date DESC LIMIT 1"
  db.query(sql, (e, data) => {
    if(e) return res.json("Error")
    else {
      res.json(data) 
      console.log(data)
    }
  })
}

export {addAnnouncement, dataAnnouncement}