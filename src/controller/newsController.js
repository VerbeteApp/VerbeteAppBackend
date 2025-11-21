const newsService = require("../services/newsService");


const fetchNewsFromExtAPI = async (req,res) => {
    console.log("Fetching news from external API");
    try{
        await newsService.fetchDailyNews();
        res.status(201).json({message: "Fetch was completed!"});
    } catch (error) {
        console.error("Error trying to fetch news", error);
        res.status(500).json({message: "INTERNAL ERROR!"});
    }

}

module.exports = {
    fetchNewsFromExtAPI
};