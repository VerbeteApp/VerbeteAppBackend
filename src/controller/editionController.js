const editionService = require("../services/editionService");


//Usa o service de pegar as ultimas edições do banco
const getLatestEdition = async (req, res) => {
    try {   
        const latestEdition = await editionService.getLatestFromDB();

        if(!latestEdition) {
            return res.status(404).json({ message: "No edition was found" });
        }

        res.status(200).json(latestEdition);


    } catch(error) {
        console.error("Error trying to fetch latest edition", error)
        res.status(500).json({ message: "Internal error" })
    }
};


const fetchNewsFromExtAPI = async (req,res) => {
    console.log("Fetching news from external API");
    try{
        await editionService.fetchAndSaveEdition();
        res.status(201).json({message: "Fetch was completed!"});
    } catch (error) {
        console.error("Error trying to fetch news");
        res.status(500).json({message: "INTERNAL ERROR!"});
    }

}

module.exports = {
    getLatestEdition,
    fetchNewsFromExtAPI
};

