//middleware to add the funfacts array to the states data
const data = {};
data.statesData = require('../model/statesData.json');
const State = require('../model/State');

async function merge(){
    const jsonObject = data.statesData;
    const funFacts = await State.find();
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

    return (mergedData);
}

module.exports = { merge };