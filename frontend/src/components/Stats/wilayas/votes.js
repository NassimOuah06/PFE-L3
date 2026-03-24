const { Web3 } = require("web3");
const bigInt = require("big-integer");
const providerUrl = "HTTP://127.0.0.1:7545"; // Update this with your actual provider URL
var web3 = new Web3(providerUrl);
const MyContract = require("../../../images/candidats/Voting.json");

const Votes = [
  { votes: 0, name: "Adrar" },
  { votes: 0, name: "Chlef" },
  { votes: 0, name: "Laghouat" },
  { votes: 0, name: "Oum El Bouaghi" },
  { votes: 0, name: "Batna" },
  { votes: 0, name: "Béjaïa" },
  { votes: 0, name: "Biskra" },
  { votes: 0, name: "Béchar" },
  { votes: 0, name: "Blida" },
  { votes: 0, name: "Bouira" },
  { votes: 0, name: "Tamanrasset" },
  { votes: 0, name: "Tébessa" },
  { votes: 0, name: "Tlemcen" },
  { votes: 0, name: "Tiaret" },
  { votes: 0, name: "Tizi Ouzou" },
  { votes: 0, name: "Alger" },
  { votes: 0, name: "Djelfa" },
  { votes: 0, name: "Jijel" },
  { votes: 0, name: "Sétif" },
  { votes: 0, name: "Saïda" },
  { votes: 0, name: "Skikda" },
  { votes: 0, name: "Sidi Bel Abbès" },
  { votes: 0, name: "Annaba" },
  { votes: 0, name: "Guelma" },
  { votes: 0, name: "Constantine" },
  { votes: 0, name: "Médéa" },
  { votes: 0, name: "Mostaganem" },
  { votes: 0, name: "M'Sila" },
  { votes: 0, name: "Mascara" },
  { votes: 0, name: "Ouargla" },
  { votes: 0, name: "Oran" },
  { votes: 0, name: "El Bayadh" },
  { votes: 0, name: "Illizi" },
  { votes: 0, name: "Bordj Bou Arréridj" },
  { votes: 0, name: "Boumerdès" },
  { votes: 0, name: "El Tarf" },
  { votes: 0, name: "Tindouf" },
  { votes: 0, name: "Tissemsilt" },
  { votes: 0, name: "El Oued" },
  { votes: 0, name: "Khenchela" },
  { votes: 0, name: "Souk Ahras" },
  { votes: 0, name: "Tipaza" },
  { votes: 0, name: "Mila" },
  { votes: 0, name: "Aïn Defla" },
  { votes: 0, name: "Naâma" },
  { votes: 0, name: "Aïn Témouchent" },
  { votes: 0, name: "Ghardaïa" },
  { votes: 0, name: "Relizane" },
  { votes: 0, name: "Timimoun" },
  { votes: 0, name: "Bordj Badji Mokhtar" },
  { votes: 0, name: "Ouled Djellal" },
  { votes: 0, name: "Béni Abbès" },
  { votes: 0, name: "In Salah" },
  { votes: 0, name: "In Guezzam" },
  { votes: 0, name: "Touggourt" },
  { votes: 0, name: "Djanet" },
  { votes: 0, name: "El M'Ghair" },
  { votes: 0, name: "El Meniaa" },
];

const networkId = await web3.eth.net.getId();
const votingContract = new web3.eth.Contract(
  MyContract.abi,
  MyContract.networks[networkId].address
);
try {
  for (let index = 0; index < Votes.length; index++) {
    Votes[index].votes = Number(
      await votingContract.methods
        .getWilayaVotes(bigInt(index + 1).value)
        .call()
    );
    console.log(Votes[index].votes);
  }
} catch (error) {
  console.log("Erreur lors de la récupération de l'état du votant :", error);
}

export default Votes;
