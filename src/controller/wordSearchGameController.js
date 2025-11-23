const wordSearchService = require('../services/wordSearchService');

const getWordSearch = (req, res) => {
    try {
        const gameData = wordSearchService.generateWordSearch();
        res.status(200).json(gameData);
    } catch (error) {
        console.error("Error generating word search:", error);
        res.status(500).json({ message: "Internal error" });
    }
};

module.exports = { getWordSearch };