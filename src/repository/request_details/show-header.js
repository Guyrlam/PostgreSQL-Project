const unity = {
    text: `SELECT 
    id
    FROM request_details 
    WHERE user_id = $1 
    AND status_id = '284c8a86-92e7-4686-b5c8-3cb5ce70cbc0' 
    AND delivery_address = $2`,
    values: [],
};

async function pullRequestId(user, adress, client) {
    unity.values = [user, adress];

    const selected = await client.query(unity);

    if (selected.rows[0].deleted_at != null) {
        throw new Error('O pedido informado não foi encontrado.');
    }

    return selected.rows[0].id;
}

module.exports = {
    pullRequestId,
};
