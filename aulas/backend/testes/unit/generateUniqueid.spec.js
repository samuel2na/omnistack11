/*
1 - 1° parâmetro do describe é um nome para facilitar a identificação do que o teste faz.
2 - 2° parâmetro do describe é uma função que recebe mais 2 parâmetos:
        1° o 'it' com a mesma específica do teste.
        2° a função que efetua o teste.
3 - para rodar o teste use " npm test ".
*/
const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
    it('should generate an unique ID', () => {
        //expect(2 + 1).toBe(3);
        const id = generateUniqueId();
        expect(id).toHaveLength(8);
    })

})