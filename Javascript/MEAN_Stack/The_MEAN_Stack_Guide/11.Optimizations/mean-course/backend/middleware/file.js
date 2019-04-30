const fs = require('fs');

const deleteImage = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw (err);
    }
  });
};

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
const multer = require('multer');
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type');
    if (isValid) error = null;
    cb(error, 'backend/images'); // the path is relative to the path where server.js file is stored
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
    // cb(null, new Date().toJSON().slice(0, 23).replace(/[-:./]/g, '_') + '_' + file.originalname);
  },
});
const upload = multer({ storage: fileStorage });

const uploadImage = upload.single('image');

module.exports = { uploadImage, deleteImage };
