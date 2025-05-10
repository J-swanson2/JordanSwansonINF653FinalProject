const data = {};
data.statesData = require('../model/statesData.json');
const State = require('../model/State');

const mergedData = require('../middleware/mergeStateData');

const getAllStates = async (req, res) => {
    //call middleware mergedData.merge to merge statesData.json and the states from mongodb
    const allStates = await mergedData.merge();
    res.json(allStates);
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

const filterContig = (req, res, next) => {
    if (req.query.contig === 'true') {
        return res.json({ message: "Only contig states" });
    } else if (req.query.contig === 'false') {
        return res.json({ message: "Only non-contig states" });
    }
    next();
}

module.exports = {
    getAllStates,
    postStateFunFact,
    filterContig
}