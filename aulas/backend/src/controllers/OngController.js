const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
        return response.json(ongs);
    },

    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        // a função abaixo 'generateUniqueId' foi separada do código para efetuar os teste na aula 5.
        const id = generateUniqueId();

        await connection('ongs').insert({
            id, name, email, whatsapp, city, uf,
        })

        return response.json({ id });
    }
};