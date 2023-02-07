const crypto = require('crypto');

const createHash = (str) => {
    const hash = crypto.createHash('sha256').update(str).digest('base64');
    return hash
};
module.exports = { createHash: createHash }
