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
    const stateCode = req.params.state.toUpperCase();
    const allStates = await mergedData.merge();
    const oneState = allStates.find(state => state.code === stateCode);

    if (!oneState) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }
    res.json(oneState);
}

const getStateValue = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const valueType = req.params.value.toLowerCase();
    const allStates = await mergedData.merge();
    const oneState = allStates.find(state => state.code === stateCode);

    if (!oneState) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }

    switch (valueType) {
        case 'capital':
            return res.json({ state: oneState.state, capital: oneState.capital_city });
        case 'nickname':
            return res.json({ state: oneState.state, nickname: oneState.nickname });
        case 'population':
            return res.json({ state: oneState.state, population: oneState.population });
        case 'admission':
            return res.json({ state: oneState.state, admission: oneState.admission_date });
        case 'funfact':
            return res.json({ state: oneState.state, funfact: oneState.funfact[0] });
        default: return res.status(404).json({ message: 'Invalid parameter' });
    }
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
    getStateValue,
    getState
}