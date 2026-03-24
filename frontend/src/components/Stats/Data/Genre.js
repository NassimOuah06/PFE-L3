const { Web3 } = require("web3");
const providerUrl = "HTTP://127.0.0.1:7545"; // Update this with your actual provider URL
var web3 = new Web3(providerUrl);
const MyContract = require("../../../images/candidats/Voting.json");

const networkId = await web3.eth.net.getId();
const votingContract = new web3.eth.Contract(
  MyContract.abi,
  MyContract.networks[networkId].address
);
let genre = [
  { name: "Homme", votes: 0 },
  { name: "Femme", votes: 0 },
];
try {
  genre[0].votes = Number(await votingContract.methods.getMaleVotes().call());
  genre[1].votes = Number(await votingContract.methods.getFemaleVotes().call());
} catch (error) {
  console.log("Erreur lors de la récupération de l'état du votant :", error);
}

export default genre;
