const axios = require('axios');
const Edition = require('../models/Edition');

const fetchAndSaveEdition = async () => {
    console.log("Searching for latest news...");

    const categoriesToFetch = ['games', 'apple', 'tecnologia', 'economia'];
    const categoriesForDatabase = []; //"container" para juntar os resultados

    try{
    //LUGAR ONDE SERÁ FEITO A REQUISÃO PARA A newsAPI

    const apiKey = process.env.NEWS_API_KEY;

    for (const categoryName of categoriesToFetch) {
        console.log(`Searching category: ${categoryName}...`)
        const response = await axios.get(
            'https://newsapi.org/v2/everything',
            {
                params: {
                    apiKey: apiKey,
                        q: categoryName, // Usamos 'q' (palavra-chave) ao invés de 'category'
                        // 'country' foi removido, pois '/everything' não o suporta bem com 'q'
                        language: 'pt', // É bom especificar o idioma
                        sortBy: 'publishedAt', // Para pegar os mais recentes
                        pageSize: 20 // 10 notícias por palavra-chave
                }
            }
        );

        const newsFromApi = response.data.articles;

        const formattedCategory = {
            name: categoryName,
            news: newsFromApi
        };

        categoriesForDatabase.push(formattedCategory);
    }



    console.log('All categories searched successfully')
    console.log(categoriesForDatabase);

    console.log('Categorias buscadas. Preparando para salvar no banco...');

    const newEditionData = {
        date: new Date(),
        category: categoriesForDatabase
    };

    const editioToSave = new Edition(newEditionData)

    await editioToSave.save();

    console.log('🎉 Nova edição salva no banco de dados com sucesso!');



    } catch (error) {
        console.error("ERROR trying to fetch or save news:", error.message);
    }
};

module.exports = fetchAndSaveEdition;