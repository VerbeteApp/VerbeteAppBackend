const axios = require('axios');

const NEGATIVE_KEYWORDS = ['morte', 'assassinato', 'crime', 'tragédia', 'polícia', 'sangue', 'influenciadora', 'influenciador', 'adulto', 'sexo', 'racismo', 'guerra', 'escândalo', 'política'];

const sources = ['globo', 'uol', 'google news'];

const fetchDailyNews = async () => {
    const apiKey = process.env.NEWS_API_KEY;
    const query = `(${NEGATIVE_KEYWORDS.join(' OR ')})`;

    console.log('Fetching news...');

    try {
        const response = await axios.get('https://newsapi.org/v2/everything?', {
            params: {
                apiKey: apiKey,
                q: `NOT (${query})`,
                language: 'pt',
                sortBy: 'publishedAt',
                pageSize: 50
            }
        });

        return response.data.articles.map(article => ({
            title: article.title,
            summary: article.description,
            cover_image: article.urlToImage,
            date: article.publishedAt,
            author: article.author,
            link: article.url,
            description: article.content || article.description,
            language: 'pt-br'
        }));

    } catch(error) {
        console.error('Error fetching news: ', error.message);
        return [];
    }

}

module.exports = { fetchDailyNews };