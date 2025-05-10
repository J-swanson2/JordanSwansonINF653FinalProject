const data = {};
data.statesData = require('../model/statesData.json');

const getAllStates = (req, res) => {
    res.json(data.statesData);
}

module.exports = {
    getAllStates
}