import express from 'express'
import multer from 'multer'
import { addAnnouncement, dataAnnouncement } from '../controller/announcement.js'
import path from 'path'
import cors from 'cors'

const announcementRouter = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname))
  }
}) 
const upload = multer({storage: storage})

announcementRouter.post("/add", upload.single('image'), addAnnouncement)
announcementRouter.get("/data", dataAnnouncement)

export default announcementRouter