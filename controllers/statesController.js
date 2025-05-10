const State = require('../model/State')

const getAllStateFacts = async (req, res) => {
    const employees = await Employee.find();
    if (!employees) return res.status(204).json({ 'message': 'No Employees found.' });
    res.json(employees);
}

const createNewStateFacts = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State Code and Fun Facts are required' });
    }

    try {
        const result = await State.create({
            stateCode: req.body.stateCode,
            funfacts: state.body.funfacts
        });
        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateStateFacts = async (req, res) => {
    if (!req?.body?.stateCode || !req?.body?.funfacts) {
        return res.status(400).json({ 'message': 'State Code and Fun Facts are required' });
    }

    const state = await State.findOne({ stateCode: req.body.stateCode }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches Code ${req.body.stateCode}.` });
    }
    //set new fun facts EQUAL to body, this needs updated later to ADD ON TO instead of replacing the old data.
    if (req.body?.funfacts) state.funfacts = req.body.funfacts;
    const result = await state.save();
    res.json(result);
}

const deleteStateFacts = (req, res)

module.exports = {
    getAllStateFacts,
    createNewStateFacts,
    updateStateFacts
}