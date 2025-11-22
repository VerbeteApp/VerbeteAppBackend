const axios = require("axios");
const Edition = require('../models/Edition');


const NEGATIVE_KEYWORDS = [
  "morte",
  "assassinato",
  "crime",
  "tragédia",
  "polícia",
  "sangue",
  "influenciadora",
  "influenciador",
  "adulto",
  "sexo",
  "racismo",
  "guerra",
  "escândalo",
  "política",
  "Lula",
  "Trump",
  "Bolsonaro",
  "youtuber",
  "bola"
];

//FETCH NEWS IN EXTERNAL API
const fetchDailyNews = async () => {
    const apiKey = process.env.NEWS_API_KEY;
    const excludeQuery = `(${NEGATIVE_KEYWORDS.join(" OR ")})`;
    const htmlTagRegex = /<[^>]+>/;

    console.log("Fetching news...");

    try {
        //talvez tenha q tirar o ? do final da url

        const response = await axios.get("https://newsapi.org/v2/everything?", {
            params: {
            apiKey: apiKey,
            q: `NOT (${excludeQuery})`,
            language: "pt",
            sortBy: "publishedAt",
            pageSize: 60,
            },
        });

        const validArticles = response.data.articles.filter(
            (article) =>
            article.title && article.title !== "[Removed]" && article.description && !htmlTagRegex.test(article.description)
        );

        return validArticles.map(article => {

            const cleanSource = article.source.name ? article.source.name.split('.')[0] : 'Independente';

            return {

            title: article.title,
            summary: article.description,
            cover_image: article.urlToImage,
            date: article.publishedAt,
            author: article.author,
            source: cleanSource,
            link: article.url,
            description: article.content || article.description,
            language: "pt-br",
            };
        });
    } catch (error) {
    console.error("Error fetching news: ", error.message);
    return [];
    }
};

//GET ALL THE NEWS IN DATABASE
const getDailyNewsFromDB = async () => {
    console.log("Searching news in database...")
    try {
        const latestEdition = await Edition.findOne()
            .sort({date: -1})
            .select('news')
            .exec();

        if (!latestEdition){
            console.log("No edtion found");
            return null;
        }
        
        return latestEdition.news;

    } catch (error) {
        console.error("Error trying to find latest horoscope in DataBase", error);
        throw error;
    }
}



module.exports = { fetchDailyNews, getDailyNewsFromDB };
