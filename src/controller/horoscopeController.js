const horoscopeService = require('../services/horoscopeService');

//FETCH IN EXTERNAL API
const fetchAllHoroscope = async (req, res) => {
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

//GET IN DATABASE
const getAllHoroscope = async (req, res) => { 
    try {
        const latestHoroscope = await horoscopeService.getAllHoroscopeFromDB();

        if (!latestHoroscope) {
            return res.status(404).json({message: 'No horoscope found'});
        }

        res.status(200).json(latestHoroscope);
        
    } catch (error) {
        console.error("Error trying to get latest horoscope", error)
        res.status(500).json({ message: "Internal error" })
    }
};

//GET IN DATABASE BY SIGN
const getHoroscopeBySign = async (req, res) => {
    try {
        const signName = req.params.sign;

        const signData = await horoscopeService.getHoroscopeBySignFromDB(signName);

        if (!signData){
            return res.status(404).json({ message: 'Sign not found' });
        }

        return res.status(200).json(signData);
    } catch (error) {
        console.error("Error getting sign:", error);
        res.status(500).json({ message: "Internal error" });
    }
};


module.exports = {
    fetchAllHoroscope,
    getAllHoroscope,
    getHoroscopeBySign
};