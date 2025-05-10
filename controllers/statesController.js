const data = {};
data.states = require('../model/statesData.json');

const getAllStates = (req, res) => {
    res.json(data.states);
}

/*const createNewState = (req, res) => {

}

const updateState = (req, res) => {

}

const deleteState = (req, res) => {

}*/

module.exports = {
    getAllStates
}