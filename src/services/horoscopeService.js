const axios = require('axios');
const Horoscope = require('../models/schemas/Horoscope');
const translate  = require('translate');


class HoroscopeService {

    static baseURL = "https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=Aries"

    static signData = {
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


  static async getDailyHoroscope(sign) {
    try {
        const response = await axios.get(`${this.baseURL}/get-horoscope/daily`, {
            params: {
                sign: sign,
                day: 'TODAY'
            }
        });

        return response.data.data.horoscope.data;

    } catch (error) {
        console.error(`Fetching error to ${sign}:`, error.message);
        throw error;
    }
  }

  static async getDailyHoroscopeInPortuguese(sign) {
    try{
        const originalText = await this.getDailyHoroscope(sign);
        const translatedText = await translate(originalText, { from: "en", to: "pt"});
        return translatedText;

    }catch (error){
        console.error(`Translating error to ${sign}`, error.message);
        return await this.getDailyHoroscope(sign);
    }
  }

  static async processAndSaveHoroscopes() {
        const today = new Date();
        const promises = this.signs.map(async (signEn) => {
            const message = await this.getDailyHoroscopeInPortuguese(signEn);
            const signPt = this.signTranslations[signEn];

            const horoscopeData = {
                sign: signPt,
                date: today,
                message: message
            };
        

            const savedRecord = await Horoscope.create(horoscopeData);
            console.log(`Save: ${signPt}`)

            return savedRecord

        }


    );

  }

}

module.exports = {
    HoroscopeService
}