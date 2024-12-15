import express from 'express'
import { addBook, bookStatusCount, countBook, deleteBook, findBook, fineBook, issueBook, issueBookList, listBook, returnBook, searchBook, updateBook } from '../controller/book.js'
import {adminList, adminLogIn } from '../controller/admin.js'

const bookRouter = express.Router()
const adminRouter = express.Router()

adminRouter.post("/login", adminLogIn)
adminRouter.get("/list", adminList)
bookRouter.post("/add", addBook)
bookRouter.get("/list", listBook)
bookRouter.post("/search", searchBook)
bookRouter.get("/find/:bookID", findBook)
bookRouter.get("/count", countBook)
bookRouter.post("/update/:bookID", updateBook)
bookRouter.delete("/delete/:bookID", deleteBook)
bookRouter.get("/:bookID", findBook)
bookRouter.post("/issue", issueBook)
bookRouter.post("/return", returnBook)
bookRouter.get("/issue/list", issueBookList)
bookRouter.get("/issue/count", bookStatusCount)
bookRouter.post("/issue/fine", fineBook)

export {adminRouter, bookRouter}