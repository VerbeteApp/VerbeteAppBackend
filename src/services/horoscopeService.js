const axios = require('axios');
const translate = require('translate').default;
// console.log('🕵️ BIBLIOTECA TRANSLATE:', translate);

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

module.exports = {
    getDailyHoroscopeInPortuguese,
    getAllDailyHoroscopeInPortuguese
}