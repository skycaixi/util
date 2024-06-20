const crypto = require("crypto");
const algo = 'aes-128-cbc';
const ivLen = 16;

function makeRandomIV(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const encryptMsgWithAES128 = (plainText, key) => {
    const textBuffer = Buffer.from(plainText);
    const iv = makeRandomIV(ivLen);
    const ivBuffer = Buffer.from(crypto.createHash('md5').update(iv).digest('hex'), "hex");
    const keyBuffer = Buffer.from(crypto.createHash('md5').update(key).digest('hex'), "hex");
    let cipher = crypto.createCipheriv(algo, keyBuffer, ivBuffer);
    let encrypted = cipher.update(textBuffer, 'uft8', 'base64');
    let encryptedFinal = cipher.final('base64');
    let encryptedText = (encrypted +  encryptedFinal);
    return iv + encryptedText;
}

const decryptMsgWithAES128 = (encryptedText, key) => {
    const iv = encryptedText.substr(0, ivLen);
    const ivBuffer = Buffer.from(crypto.createHash('md5').update(iv).digest('hex'), "hex");
    const keyBuffer = Buffer.from(crypto.createHash('md5').update(key).digest('hex'), "hex");
    let decipher = crypto.createDecipheriv(algo, keyBuffer, ivBuffer);
    decipher.setAutoPadding(true);
    let decipheredContent = decipher.update(encryptedText.substr(ivLen, encryptedText.length - ivLen), 'base64', 'utf8');
    decipheredContent += decipher.final('utf8');
    return decipheredContent;
}

module.exports = {
    encryptMsgWithAES128,
    decryptMsgWithAES128,    
}