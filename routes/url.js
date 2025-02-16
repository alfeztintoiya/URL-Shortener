const express = require('express')
const {generateShortURL,getShortURL,getAnalytics} = require('../controllers/url');
const router = express.Router();

router.post('/',generateShortURL);

router.get('/:shortID',getShortURL);

router.get('/analytics/:shortID',getAnalytics);

module.exports = router;