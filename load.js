var ethers = require('ethers');
const readline = require('node:readline');
const { hexToText } = require('./utils/hex');
const { decryptMsgWithAES128 } = require('./utils/encrypt');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.stdoutMuted = true;
const DATA = "---";
rl.question('P: ', function (pass) {
  const wallet = ethers.Wallet.fromMnemonic(decryptMsgWithAES128(hexToText(DATA), pass));
  console.log('Mnemonic: ', decryptMsgWithAES128(hexToText(DATA), pass));
  console.log('Key: ', wallet.privateKey);
  console.log('Address: ', wallet.address);
  rl.close();
});

rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (rl.stdoutMuted)
    rl.output.write("*");
  else
    rl.output.write(stringToWrite);
};
