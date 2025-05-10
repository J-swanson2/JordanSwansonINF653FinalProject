const express = require('express');
const router = express.Router();
const path = require('path');
const statesDataController = require('../../controllers/statesDataController');

router.route('/')
    .get(statesDataController.filterContig,statesDataController.getAllStates)
    .post(statesDataController.postStateFunFact);



module.exports = router;