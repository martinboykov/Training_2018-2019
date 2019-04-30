/* eslint-disable no-process-env*/
const fs = require('fs');
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  // Your SECRET ACCESS KEY from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.SECRET_ACCESS_KEY
  secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
  // Not working key, Your ACCESS KEY ID from AWS should go here,
  // Never share it!
  // Setup Env Variable, e.g: process.env.ACCESS_KEY_ID
  accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
  region: process.env.AWS_S3_BUCKET_REGION, // region of your bucket
});

const s3 = new aws.S3();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'mean-spa-complete-guide-2018-img-upload',
    acl: 'public-read-write',
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      const isValid = MIME_TYPE_MAP[file.mimetype];
      let error = new Error('Invalid mime type');
      if (isValid) error = null;
      cb(error, Date.now() + '_' + file.originalname);
    },
  }),
});
const singleUpload = upload.single('image');

function uploadImg(req, res, next) {
  singleUpload(req, res, function(err, some) {
    if (err) {
      return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
    }
    // return res.json({ 'imageUrl': req.file.location });
    return next();
  });
}

const deleteImg = async function(filename) {
  const params = {
    Bucket: 'mean-spa-complete-guide-2018-img-upload',
    Key: filename,
  };
  // must check if this works
  // try {
  //   await s3.headObject(params).promise();
  //   console.log('File Found in S3');
  //   try {
  //     await s3.deleteObject(params).promise();
  //     console.log('file deleted Successfully');
  //   } catch (err) {
  //     console.log('ERROR in file Deleting : ' + JSON.stringify(err));
  //     throw (err);
  //   }
  // } catch (err) {
  //   console.log('File not Found ERROR : ' + err.code);
  //   throw (err);
  // }
  s3.deleteObject(params, function(err, data) {
    if (err) {
      console.log(err);
      throw (err);
    }
  });
};

module.exports = { uploadImg, deleteImg };
