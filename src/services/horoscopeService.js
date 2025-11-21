const axios = require('axios');
const translate = require('translate');

const signs = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

const signTranslations = {
    "Aries": "Áries",
    "Taurus": "Touro",
    "Gemini": "Gêmeos",
    "Cancer": "Câncer",
    "Leo": "Leão",
    "Virgo": "Virgem",
    "Libra": "Libra",
    "Scorpio": "Escorpião",
    "Sagittarius": "Sagitário",
    "Capricorn": "Capricórnio",
    "Aquarius": "Aquário",
    "Pisces": "Peixes"
};

const getDailyHoroscope = async (sign) => {
    console.log('Getting horoscope...')

    try{
        const day = new Date().toISOString().split('T')[0];
        const apiResponse = await fetch(
        `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`
        );

        if (!apiResponse.ok) {
        throw new Error(`API error: ${apiResponse.status}`);
        }
        const data = await apiResponse.json();
        return data.data.horoscope_data;

    } catch(error){
        console.error('Horoscope get error: ', error.message);
        throw error;

    }
};

const getDailyHoroscopeInPortuguese = async (sign) => {
    try{
        const dailyHoroscope = await this.getDailyHoroscope(sign);
        const translatedText = await translate(dailyHoroscope, {from: 'en', to: 'pt'});
        return translatedText
    } catch(error){
        console.error('Error translating horoscope', error);
        throw error;
    }
}

const getAllDailyHoroscope = async () => {
    try{
        const today = new Date();

        const HoroscopePromises = this.signs.map(async (sign) => {
            const message = await this.getDailyHoroscopeInPortuguese(sign);
            return {
                sign: this.signTranslations[sign],
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
    getAllDailyHoroscope
}