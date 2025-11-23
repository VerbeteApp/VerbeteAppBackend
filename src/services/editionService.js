const Edition = require('../models/Edition');
const newsService = require('./newsService');
const horoscopeService = require('./horoscopeService');
const wordGameService = require('./wordGameService');
const wordSearchService = require('./wordSearchService');


//Essa função será chamada apenas pelo cron
const fetchAndSaveEdition = async () => {
    console.log("Starting the process to fetch and save a daily edition...");


    try{
        const [newsData, horoscopeData] = await Promise.all([
            newsService.fetchDailyNews(),
            horoscopeService.getAllDailyHoroscopeInPortuguese()
        ]);

        const dailyWord = wordGameService.fetchDailyWordFromArray();
        console.log(`Edition's word: ${dailyWord}`);

        const dailyWordSearch = wordSearchService.generateWordSearch();
        console.log(`Word Search generated with ${dailyWordSearch.words.length} words.`);


        const lastEdition = await Edition.findOne().sort({ edition_number: -1 });
        const nextEditionNum = lastEdition ? lastEdition.edition_number + 1 : 1;

        console.log(`📝 Criando Edição #${nextEditionNum} com ${newsData.length} notícias.`);

        const newEdition = new Edition({
            date: new Date(),
            edition_number: nextEditionNum,
            news: newsData,
            horoscope: horoscopeData,
            word_game: dailyWord,
            word_search_game: dailyWordSearch
        });

        await newEdition.save();
        console.log('EDITION CREATED AND SUCESSFULLY SAVE!!!!!')
        return newEdition;



    } catch(error) {
        console.error('ERROR TRYING TO SAVE EDITION', error);
        throw error;

    }
};

const getLatestFromDB = async () => {
    console.log("Searching latest edition from MongoDB...");
    try{
        const latestEdition = await Edition.findOne()
        .sort({date: -1})
        .exec();

        return latestEdition;
    } catch (error) {
        console.error("Error trying to find latest edition:", error)
    }
};


const getAllEditionsSummary = async () => {
    console.log("Fetching editions summary...");
    try {
        const summary = await Edition.getSummary();
        return summary;
    } catch (error) {
        console.error("Error fetching editions summary:", error);
        throw error;
    }
};




module.exports = {fetchAndSaveEdition, getLatestFromDB, getAllEditionsSummary};