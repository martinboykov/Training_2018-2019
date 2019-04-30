/* eslint-disable no-process-env*/
/* eslint-disable new-cap*/
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'melodic-splicer-226715', // CHANGE THIS
  keyFilename: path.join(__dirname, '..', 'mean-oneApp-heroku-googleCloud-2a62da1b0c64.json'), // CHANGE THIS
});
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

const BUCKET_NAME = 'mean-app-uploaded-images'; // CHANGE THIS
const bucket = storage.bucket(BUCKET_NAME);

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`;
}

function sendUploadToGCS(req, res, next) {
  if (!req.file) {
    return next();
  }
  if (!MIME_TYPE_MAP[req.file.mimetype]) {
    throw new Error('invalid file type');
  }

  const gcsname = Date.now() + '_' + req.file.originalname + '.' + MIME_TYPE_MAP[req.file.mimetype];

  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
    resumable: false,
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
}

const deleteImg = async function(filename) {
  try {
    await storage
      .bucket(BUCKET_NAME)
      .file(filename)
      .delete();
    console.log(`gs://${bucket}/${filename} deleted.`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { multer, sendUploadToGCS, deleteImg };


