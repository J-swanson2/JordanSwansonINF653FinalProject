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
            return res.json({ state: oneState.state, population: oneState.population.toLocaleString() });
        case 'admission':
            return res.json({ state: oneState.state, admitted: oneState.admission_date });
        case 'funfact':
            if (!oneState.funfacts) {
                return res.status(404).json({ message: 'No Fun Facts found for ' + oneState.state });
            }
            const rand = Math.floor(Math.random() * oneState.funfacts.length);
            return res.json({ funfact: oneState.funfacts[rand] });
        default: return res.status(404).json({ message: 'Invalid parameter' });
    }
}

const postStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const allStates = await mergedData.merge();
    const oneState = allStates.find(state => state.code === stateCode);

    if (!oneState) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }

    const funfacts = req.body.funfacts;

    if (!funfacts) {
        return res.status(400).json({ message: 'State fun facts value required' });
    }

    if (!Array.isArray(funfacts)) {
        return res.status(404).json({ message: 'State fun facts value must be an array' });
    }

    try {
        //check if state already in MongoDB
        const existingState = await State.findOne({ stateCode });

        //if in MongoDB, append the funfacts to the array
        if (existingState) {
            existingState.funfacts = existingState.funfacts.concat(funfacts);
            const result = await existingState.save();
            return res.status(201).json(result);
        } else {
            const result = await State.create({
                stateCode,
                funfacts
            });
            res.status(201).json(result);
        }      
    } catch (err) {
        console.error(err);
    }
}

const patchStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const allStates = await mergedData.merge();
    const oneState = allStates.find(state => state.code === stateCode);

    if (!oneState) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }

    let index = req.body.index;
    const funfact = req.body.funfact;

    if (!index) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }

    if (!funfact) {
        return res.status(400).json({ message: 'State fun fact value required' });
    }

    if (index < 1) {
        return res.status(400).json({ message: 'Incorrect index parameter' });
    }
    index--;

    try {
        //check if state already in MongoDB
        const existingState = await State.findOne({ stateCode });

        //if in MongoDB, append the funfacts to the array
        if (!existingState) {
            return res.status(400).json({ message: 'No Fun Facts found for ' + oneState.state });
        }

        if (index >= existingState.funfacts.length) {
            return res.status(400).json({ message: 'No Fun Fact found at that index for ' + oneState.state });
        }

        existingState.funfacts[index] = funfact;
        const result = await existingState.save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
    }
}

const deleteStateFunFact = async (req, res) => {
    const stateCode = req.params.state.toUpperCase();
    const allStates = await mergedData.merge();
    const oneState = allStates.find(state => state.code === stateCode);

    if (!oneState) {
        return res.status(404).json({ message: 'Invalid state abbreviation parameter' });
    }

    let index = req.body.index;

    if (!index) {
        return res.status(400).json({ message: 'State fun fact index value required' });
    }

    if (index < 1) {
        return res.status(400).json({ 'message': 'Index must be greater than 0' });
    }
    index--;

    try {
        //check if state already in MongoDB
        const existingState = await State.findOne({ stateCode });

        //if in MongoDB, append the funfacts to the array
        if (!existingState) {
            return res.status(400).json({ message: 'No Fun Facts found for ' + oneState.state });
        }

        if (index >= existingState.funfacts.length) {
            return res.status(400).json({ message: 'No Fun Fact found at that index for ' + oneState.state });
        }

        existingState.funfacts.splice(index, 1);
        const result = await existingState.save();
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getStates,
    getStateValue,
    getState,
    postStateFunFact,
    patchStateFunFact,
    deleteStateFunFact
}