const data = {};
data.statesData = require('../model/statesData.json');
/*const statesFactsController = require('./statesFactsController');*/
const State = require('../model/State');

const getAllStates = async (req, res) => {
    const jsonObject = data.statesData;
    const funFacts = await State.find();
    console.log("Fetched from DB:", funFacts);
    const itemMap = {};

    funFacts.forEach(item => {
        itemMap[item.stateCode] = item.funfacts;
    });

    const mergedData = jsonObject.map(obj => {
        const stateCode = obj.code;
        if (obj.code && itemMap[stateCode]) {
            return {
                ...obj,
                funfacts: itemMap[stateCode]
            };
        }
        return obj;
    });

    res.json(mergedData);
}

const postStateFunFact = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State Code and Fun Facts are required' });
    }

    try {
        const result = await State.create({
            stateCode: req.body.stateCode,
            funfacts: req.body.funfacts
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllStates,
    postStateFunFact
}