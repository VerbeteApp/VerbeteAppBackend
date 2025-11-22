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


const getDailyNews = async(req, res) => {
    try {
        const latestNews = await newsService.getDailyNewsFromDB();

        if (!latestNews) {
            return res.status(404).json({message: 'No horoscope found'});
        }

        res.status(200).json(latestNews);
        
    } catch (error) {
        console.error("Error trying to get latest news", error)
        res.status(500).json({ message: "Internal error" })
    }
}



module.exports = {
    fetchNewsFromExtAPI,
    getDailyNews
};