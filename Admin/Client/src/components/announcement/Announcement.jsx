import React, { useState } from 'react'
import './Announcement.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Announcement = () => {
  const [image, setImage] = useState(false)
  const [content, setContent] = useState("")

  const refresh = () => {
    setImage("")
    setContent("")
  }
  const navigate = useNavigate()
  const submit = (e) => {
    const formData = new FormData()
    formData.append('image', image)
    formData.append('content', content)
    axios.post("http://localhost:4000/announcement/add", formData)
    .then(result => {
      if (result.data.sucess) {
        refresh()
        console.log("Done")
        toast.success(result.data.message)
      }
      else{
        toast.error(result.data.message)
      }
    })
    .catch(e => console.log(e))
  }

  return (
    <div className='announcement-page'>
      <form className='announcement-container' onSubmit={submit}>
        <div className='img-preview-container'>
          <div className='upload-img'>
            <h4>Upload Image</h4>
            <input type="file" name="" className={!image ? 'img-container' : 'img-file'} onChange={(e) => setImage(e.target.files[0])}/>
          </div>
          <div className='preview-img'>
            { image ?
              <>
                <h4>Preview Imge</h4>
                <label htmlFor=""><img src={image ? URL.createObjectURL(image) : ""} className='img-preview'/></label>
              </> : 
              <> </>}
          </div>
        </div>
        <div className='text-container'>
          <h4>Announcement Details</h4>
          <textarea name="" rows={8} value={content} onChange={(e) => setContent(e.target.value)}></textarea>
        </div>
        <div className='announcement-btn-container'>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Announcement
