const router = require('express').Router();
const notesroute = require('./notesroute');

router.use(notesroute);

module.exports = router;