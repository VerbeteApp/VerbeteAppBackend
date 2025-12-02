const editionService = require("../services/editionService");
const Edition = require('../models/Edition');



//Usa o service de pegar as ultimas edições do banco
const getLatestEdition = async (req, res) => {
    try {   
        const latestEdition = await editionService.getLatestFromDB();

        if(!latestEdition) {
            return res.status(404).json({ message: "No edition found "});
        }

        res.status(200).json(latestEdition);


    } catch(error) {
        console.error("Error trying to get latest edition", error)
        res.status(500).json({ message: "Internal error" })
    }
};

//Usa o service de popular o banco com uma edição completa (news, horoscopo, ...)
const fetchAndSaveEdition = async (req, res) => {
    try {   
        const latestEdition = await editionService.fetchAndSaveEdition();

        if(!latestEdition) {
            return res.status(404).json({ message: "Internal error trying to fetch and save edition" });
        }

        const lastEdition = await Edition.findOne().sort({ edition_number: -1 });

        res.status(200).json({message: `Edition #${lastEdition.edition_number} has been successfully created and saved!`});


    } catch(error) {
        console.error("Error trying to fetch and save latest edition", error)
        res.status(500).json({ message: "Internal error" })
    }
};


const getEditionsSummary = async (req, res) => {
    try {
        const summary = await editionService.getAllEditionsSummary();
        res.status(200).json(summary);
    } catch (error) {
        console.error("Error getting editions summary:", error);
        res.status(500).json({ message: "Internal error" });
    }
};

const getEditionByNumber = async (req, res) => {
    try {
        const { edition_number } = req.params;

        if (!edition_number){
            return res.status(400).json({message: "Edition Number is required"});
        }

        const editionData = await editionService.getEditionByNumber(edition_number);

        if (!editionData) {
            return res.status(404).json({ message: "Edition not found" });
        }

        res.status(200).json(editionData)

    } catch (error) {
        console.error("Error getting Edition from DB:", error);
        res.status(500).json({ message: "Internal error" });
    }
}





module.exports = {
    getLatestEdition,
    fetchAndSaveEdition,
    getEditionsSummary,
    getEditionByNumber
};

