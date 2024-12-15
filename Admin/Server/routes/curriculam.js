import express from 'express'
import { listCurriculam, addCurriculam, findCurriculam, } from '../controller/curriculam.js'

const curriculamRouter = express.Router()

curriculamRouter.post("/add", addCurriculam)
curriculamRouter.post("/find", findCurriculam)
curriculamRouter.get("/list", listCurriculam)

export default curriculamRouter