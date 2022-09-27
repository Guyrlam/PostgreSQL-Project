const { pool, begin, commit, rollback } = require('../../repository/repository');
const { createHeader } = require('../../repository/request_details/add-header');
const { alterStatus } = require('../../repository/request_details/update-header');
const { insertRequestProducts } = require('../../repository/request_list/add-list');

async function addRequest(data) {
    const status = {
        Error: null,
    };

    let client;

    try {
        client = await pool.connect();

        if (!data || !data.user || data.user === undefined) {
            throw new Error(
                'Não foi possível adicionar esses produtos pois o usuário não foi informado!'
            );
        } else if (!data.list[0].product || data.list[0].product === undefined) {
            throw new Error('Não foi possível adicionar esses produtos!');
        } else if (!data.list[0].amount || data.list[0].amount === undefined) {
            throw new Error(
                'Não foi possível adicionar esses produto pois sua quantidadea não foram informadas!'
            );
        } else if (!data.delivery_adress || data.delivery_adress === undefined) {
            throw new Error(
                'Não foi possível adicionar esses produtos pois o endereço de entrega não foi informado!'
            );
        }

        await begin(client);

        const request = await createHeader(data.user, data.delivery_adress, client);

        const resp = await insertRequestProducts(request, data.list, client);
        if (resp !== true) {
            throw resp;
        }

        await alterStatus('18bfb11c-f300-422f-9dc2-98ef3223a39e', request, client);
        await commit(client);
    } catch (error) {
        await rollback(client);
        status.Error = error.message;
    }

    client.release();
    return status;
}

module.exports = { addRequest };
