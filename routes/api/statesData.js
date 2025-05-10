const express = require('express');
const router = express.Router();
const path = require('path');
const statesDataController = require('../../controllers/statesDataController');

router.route('/')
    .get(statesDataController.getAllStates)
    .post(statesDataController.postStateFunFact);

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id });
    })

module.exports = router;