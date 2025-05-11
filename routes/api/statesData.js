const express = require('express');
const router = express.Router();
const path = require('path');
const statesDataController = require('../../controllers/statesDataController');

router.route('/')
    .get(statesDataController.getStates);
    
router.route('/:state')
    .get(statesDataController.getState);

router.route('/:state/:value')
    .get(statesDataController.getStateValue);

router.route('/:state/funfact')
    .post(statesDataController.postStateFunFact)
    .patch(statesDataController.patchStateFunFact);



module.exports = router;