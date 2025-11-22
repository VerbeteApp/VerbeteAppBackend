const axios = require('axios');
const translate = require('translate').default;
const Edition = require('../models/Edition');



const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

const signTranslations = {
    "Aries": "aries",
    "Taurus": "touro",
    "Gemini": "gemeos",
    "Cancer": "cancer",
    "Leo": "leao",
    "Virgo": "virgem",
    "Libra": "libra",
    "Scorpio": "escorpiao",
    "Sagittarius": "sagitario",
    "Capricorn": "capricornio",
    "Aquarius": "aquario",
    "Pisces": "peixes"
};

//FETCH A SIGN IN EXTERNAL API
const getDailyHoroscope = async (sign) => {
    console.log(`Getting horoscope for ${sign}...`);
    try{
        const day = new Date().toISOString().split('T')[0];
        const apiResponse = await axios.get(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}`,
        { timeout: 5000 }
        );
        

        return apiResponse.data.data.horoscope_data;

    } catch(error){
        console.error(`⚠️ Error fetching for ${sign}: API might be down.`);
        return null;

    }
};

//TRANSLATE SIGN BY SIGN USING THE GETDAILYHOROSCOPE FUNC
const getDailyHoroscopeInPortuguese = async (sign) => {
    try{
        const dailyHoroscope = await getDailyHoroscope(sign);

        if (!dailyHoroscope) {
            return 'Horoscope unavailable at moment'
        }

        const translatedText = await translate(dailyHoroscope, {from: 'en', to: 'pt'});
        return translatedText
    } catch(error){
        console.error('Error translating horoscope', error);
        throw error;
    }
}

//GET ALL THE SIGNS USING getDailyHoroscopeInPortuguese AND CREATE AN ARRAY USING MAP
const getAllDailyHoroscopeInPortuguese = async () => {
    try{
        const today = new Date();

        const HoroscopePromises = signs.map(async (sign) => {
            const message = await getDailyHoroscopeInPortuguese(sign);
            return {
                sign: signTranslations[sign],
                date: today,
                message: message
            };
        });

        const horoscope = await Promise.all(HoroscopePromises);
        return horoscope;
    } catch(error){
        console.error('Error fetching all horoscopes', error);
        throw error;
    }
}



//GET ALL THE HOROSCOPE IN DB
const getAllHoroscopeFromDB = async () => {
    console.log('Searching latest horoscope in database...');
    try {
        const latestEdition = await Edition.findOne()
        .sort({date: -1})
        .select('horoscope')
        .exec();

        if (!latestEdition){
            console.log("No edtion found");
            return null;
        }

        return latestEdition.horoscope;

        
    } catch (error) {
        console.error("Error trying to find latest horoscope in DataBase", error);
    }
};

//GET THE SIGN IN DB
const getHoroscopeBySignFromDB = async(signName) => {
    console.log(`Searching by ${signName} sign in database...`);

    try {
        const latestEdition = await Edition.findOne()
        .sort({date:-1})
        .select('horoscope')
        .exec();

        if (!latestEdition){
            console.log("No horoscope found");
            return null;
        }

        const foundSign = latestEdition.horoscope.find(item => item.sign === signName.toLowerCase());

        return foundSign;

    } catch (error) {
        console.error("Error trying to find sign in DB:", error);
        throw error;
    }
};




module.exports = {
    getAllDailyHoroscopeInPortuguese,
    getAllHoroscopeFromDB,
    getHoroscopeBySignFromDB
}