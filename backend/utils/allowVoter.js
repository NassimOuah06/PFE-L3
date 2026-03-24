const { Web3 } = require("web3");
const providerUrl = "HTTP://127.0.0.1:7545"; // Update this with your actual provider URL
var web3 = new Web3(providerUrl);

async function allouerUnUtilisateur(
  ownerAddress,
  ownerPrivateKey,
  publicKey,
  votingContract
) {
  try {
    web3.eth.accounts.wallet.add(ownerPrivateKey);

    const tx = votingContract.methods.allowVoter(publicKey);
    const gas = await tx.estimateGas({ from: ownerAddress });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(ownerAddress);
    const txData = {
      from: ownerAddress,
      to: votingContract.options.address,
      data: data,
      gas,
      gasPrice,
      nonce,
    };
    const receipt = await web3.eth.sendTransaction(txData);
    console.log(`Allow user Transaction hash: ${receipt.transactionHash}`);
    console.log("gggggggggggggggggggggggggggggggggggggg");
    return receipt.transactionHash;
  } catch (error) {
    console.log("Erreur lors de eligibilite:", error);
    throw error;
  }
}

module.exports = allouerUnUtilisateur;