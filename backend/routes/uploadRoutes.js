import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

// set engine
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      //set name of the file when upload
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

// custom function to check type of file
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

// endpoint api/upload will only return the file path, that I need to store in db, or display in frontend
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
