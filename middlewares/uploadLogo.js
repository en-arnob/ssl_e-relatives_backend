const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        // console.log(file)
        cb(null, 'syscon' + '-' + Date.now()+path.extname(file.originalname))
    }
})

const fileFilter = (req, res, cb) => {
    cb(null, true)
}

let upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

module.exports = upload.any()