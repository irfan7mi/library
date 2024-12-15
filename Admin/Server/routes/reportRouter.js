import express from 'express'
import  { listReport, addReport, updateReport, countReport } from '../controller/report.js'

const reportRouter = express.Router()

reportRouter.post("/add", addReport)
reportRouter.get("/list", listReport)
reportRouter.post("/update/status", updateReport)
reportRouter.post("/myreports", countReport)

export default reportRouter