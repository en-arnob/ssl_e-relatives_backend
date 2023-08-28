const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./uploads/investigations");
  },

  filename: function (req, file, cb) {
    // console.log(file)
    cb(null, "inv" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, res, cb) => {
  cb(null, true);
};

let upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload.single("image");
