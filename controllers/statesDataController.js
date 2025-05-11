const State = require('../model/State');
const mergedData = require('../middleware/mergeStateData');

const getStates = async (req, res, next) => {
    const allStates = await mergedData.merge();
    if (req.query.contig === 'true') {
        const contigStates = allStates.filter(state =>
            state.admission_number <= 48);
        return res.json(contigStates);
    } else if (req.query.contig === 'false') {
        const nonContigStates = allStates.filter(state =>
            state.admission_number > 48);
        return res.json(nonContigStates);
    }
    res.json(allStates);
}

const getState = async (req, res) => {
    const code = req.params.state.toUpperCase();
    const allStates = await mergedData.merge();
    const oneState = allStates.find(state => state.stateCode === code);

    res.json(oneState);
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
    postStateFunFact,
    getStates,
    getState
}