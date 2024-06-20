function textToHex(text) {
    return "0x" + Array.from(new TextEncoder().encode(text),
        byte => byte.toString(16).padStart(2, '0')).join('');
}

function hexToText(hexString) {
    if (hexString.length % 2 !== 0) {
        throw new Error('Invalid hex string');
    }
    hexString = hexString.substr(2);
    const byteArray = new Uint8Array(hexString.length / 2);
    for (let i = 0; i < hexString.length; i += 2) {
        byteArray[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }
    return new TextDecoder().decode(byteArray);
}

module.exports = {
    textToHex,
    hexToText
}
