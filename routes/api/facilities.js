const express = require('express')
      router = express.Router()

const facilities = require("../../controllers/facilitiesController")

router.get('/facilities', facilities.findAll)
module.exports = router;    