const crypto = require('crypto');

function encripta(texto) {
    let encripta1 = crypto.createHash('sha512').update(texto).digest('base64');
    let encripta2 = encripta1.substring(9, 36).trim() + 
                    encripta1.substring(25, 100).trim() + 
                    encripta1.substring(0, 49).trim() +
                    encripta1.substring(36, 81).trim() +
                    encripta1.substring(16, 64).trim();
    return crypto.createHash('sha512').update(encripta2).digest('base64');
}

module.exports = {encripta};