const { Web3 } = require("web3");
const bigInt = require("big-integer");
const providerUrl = "HTTP://127.0.0.1:7545"; // Update this with your actual provider URL
var web3 = new Web3(providerUrl);
const MyContract = require("../../../images/candidats/Voting.json");

const Candidats = [
  { id: 1, name: "Candidat A", votes: 0 },
  { id: 2, name: "Candidat B", votes: 0 },
  { id: 3, name: "Candidat C", votes: 0 },
  { id: 4, name: "Candidat D", votes: 0 },
];

const networkId = await web3.eth.net.getId();
const votingContract = new web3.eth.Contract(
  MyContract.abi,
  MyContract.networks[networkId].address
);
try {
  for (let index = 0; index < Candidats.length; index++) {
    Candidats[index].votes = Number(
      await votingContract.methods
        .getCandidateDetails(bigInt(index).value)
        .call()
    );
  }
} catch (error) {
  console.log("Erreur lors de la récupération de l'état du votant :", error);
}

export default Candidats;
