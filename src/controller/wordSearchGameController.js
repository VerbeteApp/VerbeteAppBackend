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

const getWordSSearchByEdition = async (req, res) => {
    try {
        const { edition_number } = req.params;

        if(!edition_number){
            return res.status(400).json({message: "Edition Number is required"});
        }

        const gameData = await wordSearchService.getWordSearchByEditionNumber(edition_number);

        if (!gameData) {
            return res.status(404).json({ message: "Edition or game not found" });
        }

        const clientResponse = {
            words: gameData.words.map(item => item.word)
        };

        res.status(200).json(clientResponse);

    } catch (error) {
        console.error("Error getting word search from DB:", error);
        res.status(500).json({ message: "Internal error" });
    }
}


const getRowsByEdition = async (req, res) => {
    try {
        const { edition_number } = req.params;

        if(!edition_number){
            return res.status(400).json({message: "Edition Number is required"});
        }

        const gameData = await wordSearchService.getWordSearchByEditionNumber(edition_number);

        if (!gameData) {
            return res.status(404).json({ message: "Edition or game not found" });
        }

        const clientResponse = {
            rows: gameData.rows,
        };

        res.status(200).json(clientResponse);

    } catch (error) {
        console.error("Error getting row from DB:", error);
        res.status(500).json({ message: "Internal error" });
    }
}


module.exports = { getWordSearch, getWordSSearchByEdition, getRowsByEdition };