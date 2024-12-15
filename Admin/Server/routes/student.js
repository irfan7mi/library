import express from 'express'
import {addStudent, countStudent, deleteStudent, findStudent, listStudent, searchStudent, studentBookStatus, studentLogIn, studentMyBook, updateStudent } from '../controller/student.js'

const studentRouder = express.Router()

studentRouder.post("/add", addStudent)
studentRouder.get("/count", countStudent)
studentRouder.post("/login", studentLogIn)
studentRouder.post("/issue/book", studentBookStatus)
studentRouder.post("/mybook", studentMyBook)
studentRouder.get("/list", listStudent)
studentRouder.post("/search", searchStudent)
studentRouder.get("/find/:stu_ID", findStudent)
studentRouder.post("/update/:Sid", updateStudent)
studentRouder.delete("/delete/:stu_ID", deleteStudent)

export default studentRouder