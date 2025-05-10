const express = require('express');
const router = express.Router();
const path = require('path');
const statesController = require('../../controllers/statesController');


router.route('/')
    .get(statesController.getAllStates);

router.route('/:id')
    .get((req, res) => {
        res.json({ "id": req.params.id });
    })

module.exports = router;