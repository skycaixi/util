var ethers = require('ethers');
const readline = require('node:readline');
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function create(mnemonic, path_index) {
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic);
    const account = hdNode.derivePath(`m/44'/60'/0'/0/${path_index}`);
    return account;
}

rl.stdoutMuted = true;
rl.question('mnemonic: ', function (mnemonic) {
    console.log(`\n`, create(mnemonic, 0).privateKey);
    rl.close();
}
);

rl._writeToOutput = function _writeToOutput(stringToWrite) {
    if (rl.stdoutMuted)
        rl.output.write("*");
    else
        rl.output.write(stringToWrite);
};