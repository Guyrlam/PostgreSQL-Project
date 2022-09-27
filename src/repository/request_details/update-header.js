const alter = {
    text: 'UPDATE request_details SET status_id = $1, updated_at = now() WHERE id = $2',
    values: [],
};

async function alterStatus(status, request, client) {
    alter.values = [status, request];

    await client.query(alter);
}

module.exports = { alterStatus };
