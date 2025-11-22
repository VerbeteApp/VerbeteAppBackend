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


module.exports = {
    getDailyWord
}