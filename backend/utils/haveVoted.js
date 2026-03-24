const {Web3} = require("web3");
const providerUrl = "HTTP://127.0.0.1:7545"; // Ensure this URL points to your local blockchain provider
const web3 = new Web3(providerUrl);
const MyContract = require("../../blockchain/build/contracts/Voting.json");

async function haveVoted(sender) {
    try {
        const networkId = await web3.eth.net.getId();

        // Ensure the contract is deployed on the current network
        if (!MyContract.networks[networkId]) {
            throw new Error(`Contract not deployed on network with ID ${networkId}`);
        }

        const votingContract = new web3.eth.Contract(
            MyContract.abi,
            MyContract.networks[networkId].address
        );

        console.log("Checking voter state for address:", sender);

        // Validate the sender address
        if (!web3.utils.isAddress(sender)) {
            throw new Error("Invalid address");
        }

        // Call the contract method to get voter state
        const state = await votingContract.methods.getVoterState(sender).call();
        console.log("Voter state:", state);
        return state;
    } catch (error) {
        console.error("Error while retrieving voter state:", error);

        // Additional error context
        if (error.message.includes("revert")) {
            console.error("Transaction reverted. Possible reasons: invalid address or contract logic error.");
        } else if (error.message.includes("invalid address")) {
            console.error("The provided address is not valid.");
        } else if (error.message.includes("Contract not deployed")) {
            console.error("The smart contract is not deployed on the expected network.");
        } else {
            console.error("An unknown error occurred.");
        }

        throw error;
    }
}

module.exports = haveVoted;
