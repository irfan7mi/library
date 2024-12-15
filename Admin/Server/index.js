import express from 'express'
import cors from 'cors'
import mysql from 'mysql'
import bodyParser from 'body-parser'
import {bookRouter, adminRouter } from './routes/book_adminRouter.js'
import studentRouder from './routes/student.js'
import curriculamRouter from './routes/curriculam.js'
import announcementRouter from './routes/announcement.js'
import reportRouter from './routes/reportRouter.js'
const app= express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
const port = 4000


const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "library"
})

app.use("/book", bookRouter)
app.use("/admin", adminRouter)
app.use("/student", studentRouder)
app.use("/curriculam", curriculamRouter)
app.use("/announcement", announcementRouter)
app.use("/report", reportRouter)

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
  if(db) {
    console.log("DB Connnected")
  }
  else{
    console.log("DB Not Connected!")
  }
})