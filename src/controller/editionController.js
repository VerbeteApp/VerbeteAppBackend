const editionService = require("../services/editionService");


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

        res.status(200).json(latestEdition);


    } catch(error) {
        console.error("Error trying to fetch and save latest edition", error)
        res.status(500).json({ message: "Internal error" })
    }
};




module.exports = {
    getLatestEdition,
    fetchAndSaveEdition
};

