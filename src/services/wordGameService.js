const curatedWordList = require('../data/5LetterWords').curatedList;
const completeWordList = require('../data/5LetterWords').curatedList;
const Edition = require('../models/Edition')

const fetchDailyWordFromArray = () => {
    const randomIndex = Math.floor(Math.random() * curatedWordList.length);

    return curatedWordList[randomIndex].toUpperCase();
};

const getAllWordsFromList = () => {
    return [completeWordList];
}

const getWordFromDB = async () => {
    console.log('Searching latest horoscope in database...');
    try {
        const latestEdition = await Edition.findOne()
        .sort({date: -1})
        .select('word_game')
        .exec();

        if (!latestEdition){
            console.log("No word found");
            return null;
        }

        return latestEdition.word_game;

        
    } catch (error) {
        console.error("Error trying to find latest word in DataBase", error);
    }
};




module.exports = {
    fetchDailyWordFromArray,
    getAllWordsFromList,
    getWordFromDB
};