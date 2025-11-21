const wordList = require('../data/wordList');

const getDailyWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);

    return wordList[randomIndex].toUpperCase();
};

module.exports = {getDailyWord};