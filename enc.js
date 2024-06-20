var ethers = require('ethers');
const readline = require('node:readline');
const { encryptMsgWithAES128 } = require('./utils/encrypt');
const { textToHex } = require('./utils/hex');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.stdoutMuted = true;
let confirmed;
rl.question('P: ', function (pass) {
    confirmed = pass;
    console.log('\nConfirming!');
    rl.question('Confirmed: ', function (pass2) {
        if (confirmed !== pass2) {
            console.log('Not match!');
            rl.close();
            process.exit();
        }
        else {
            const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16));
            console.log(mnemonic);
            const wallet = ethers.Wallet.fromMnemonic(
                ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(16))
            );
            console.log(wallet.privateKey);
            console.log('');
            console.log('Address:', wallet.address);
            
            const encrypted = encryptMsgWithAES128(wallet.mnemonic.phrase, confirmed);            
            console.log('Data: ', textToHex(encrypted));
            rl.close();
        }
    })
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
        rl.output.write("*");
    else
        rl.output.write(stringToWrite);
};