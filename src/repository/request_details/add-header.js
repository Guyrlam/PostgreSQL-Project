const { pullRequestId } = require('./show-header');

const newRequest = {
    text: "INSERT INTO request_details(user_id, status_id, delivery_address) VALUES($1, '284c8a86-92e7-4686-b5c8-3cb5ce70cbc0', $2)",
    values: [],
};

async function createHeader(user, adress, client) {
    newRequest.values = [user, adress];

    await client.query(newRequest);

    const response = await pullRequestId(user, adress, client);

    return response;
}

module.exports = { createHeader };
