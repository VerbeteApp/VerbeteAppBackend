const axios = require("axios");
const Edition = require('../models/Edition');
const restrictedWords = require('../data/restrictedWords');
const { cleanText } = require('../utils/textCleaner');
const { filterArticlesBySource } = require('../utils/sourceBlackList');

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
            pageSize: 100,
            },
        });

        const articles = (response.data && response.data.articles) ? response.data.articles : [];


        const validArticles = articles.filter(
            (article) =>
                article &&
                article.title &&
                article.title !== "[Removed]" &&
                article.description &&
                !htmlTagRegex.test(article.description)
        );

        // Removes article that contains restricted words
        const finalArticles = validArticles.filter(article => {
            const contentToCheck = (article.title + " " + article.description).toLowerCase();
            return !restrictedWords.some(word => contentToCheck.includes(word));
        });

        // Remove artigos de fontes bloqueadas usando sua utilitária
        const allowedArticles = filterArticlesBySource(finalArticles);

        // Remover artigos com títulos duplicados (mantém apenas o primeiro)
        const seenTitles = new Set();
        const uniqueArticles = [];
        for (const a of allowedArticles) {
            const titleKey = cleanText(a.title || '').toLowerCase().trim();
            if (seenTitles.has(titleKey)) continue;
            seenTitles.add(titleKey);
            uniqueArticles.push(a);
        }

        return uniqueArticles.map(article => {
            const sourceName = article && article.source && (article.source.name || article.source);
            const cleanSource = sourceName ? String(sourceName).split('.')[0] : 'Independente';

            return {
                title: cleanText(article.title),
                summary: cleanText(article.description),
                cover_image: article.urlToImage,
                date: article.publishedAt,
                author: article.author,
                source: cleanSource,
                link: article.url,
                description: cleanText(article.content || article.description),
                language: "pt-br",
            };
        }).slice(0,20);
    } catch (error) {
        console.error("Error fetching news: ", error.message || error);
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
