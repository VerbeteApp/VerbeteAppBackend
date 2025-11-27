const wordGameService = require('../services/wordGameService');

const getDailyWord = async(req, res) => {
    try {
        const dailyWord = await wordGameService.getWordFromDB();

        if (!dailyWord) {
            return res.status(404).json({message: 'No word found'});
        }

        res.status(200).json(dailyWord);

    } catch (error) {
        console.error("Error trying to get latest word", error)
        res.status(500).json({ message: "Internal error" })
    }
}


const getAllWordsFromList = async (req, res) => {

    try {
        const wordList = await wordGameService.getAllWordsFromList();
        if (!wordList) {
            return res.status(404).json({message: 'No word found'});
        }
        res.status(200).json(wordList);
    } catch (error) {
        console.error("Error trying to get worlist", error)
        res.status(500).json({ message: "Internal error trying to get worlist" })
    }
}



module.exports = {
    getDailyWord,
    getAllWordsFromList
}