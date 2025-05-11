const express = require('express');
const router = express.Router();
const path = require('path');
const statesDataController = require('../../controllers/statesDataController');

router.route('/')
    .get(statesDataController.getStates)
    .post(statesDataController.postStateFunFact);

router.route('/:state')
    .get(statesDataController.getState);

router.route('/:state/:value')
    .get(statesDataController.getStateValue);



module.exports = router;