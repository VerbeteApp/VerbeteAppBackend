const horoscopeService = require('../services/horoscopeService');


const getAllHoroscope = async (req, res) => {
    try{
        const dailyHoroscope = await horoscopeService.getAllDailyHoroscopeInPortuguese();
        if (!dailyHoroscope) {
            return res.status(404).json('No horoscope found');
        }

        res.status(200).json(dailyHoroscope);

    } catch(error){
        console.error('Error trying to fetch horoscope', error);
        res.status(500).json('INTERNAL ERROR!');
    }
}


module.exports = {
    getAllHoroscope
};