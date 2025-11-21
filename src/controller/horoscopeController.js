const horoscopeService = require('../services/horoscopeService');

//vai usar o service para pegar as últimas edições do banco
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