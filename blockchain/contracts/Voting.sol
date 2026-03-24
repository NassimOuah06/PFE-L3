pragma solidity ^0.5.16;

contract Voting {

    uint private totalVote;

    // Structure pour représenter un candidat
    struct Candidate {
        string name;
        uint voteCount;
    }

    uint[] private wilayaCount;
    uint private M;
    uint private F;
    uint private jeun;
    uint private agee;
    uint private vieux;


    // Mapping des adresses des électeurs aux candidats choisis
    mapping(address => bool) private voters;

    // Liste des candidats
    Candidate[] private candidates;

    // Adresses autorisées à appeler la fonction vote()
    mapping(address => bool) private allowedVoters;

    // Adresse de l'administrateur
    address private admin;

    // Modificateur pour restreindre l'accès aux fonctions aux comptes autorisés
    modifier onlyAdmin() {
        require(msg.sender == admin, "Vous n'etes pas autorise.");
        _;
    }

    // Modificateur pour restreindre l'accès à la fonction vote() aux personnes autorisées
    modifier onlyAllowedVoters() {
        require(allowedVoters[msg.sender], "Vous n'etes pas autorise a voter.");
        _;
    }

    // Événement déclenché lorsqu'un vote est enregistré
    event VoteRecorded(uint candidateId);

    // Constructeur pour ajouter des candidats au début
    constructor() public {
        admin = msg.sender; // L'adresse du déploiement est définie comme administrateur
        addCandidate("Candidat A");
        addCandidate("Candidat B");
        addCandidate("Candidat C");
        addCandidate("Candidat D");
        // Ajoutez plus de candidats au besoin

        // Initialisation de wilayaCount avec 58 zéros
        for (uint i = 1; i < 59; i++) {
            wilayaCount.push(0);
        }
    }

    // Fonction interne pour ajouter un candidat à la liste
    function addCandidate(string memory _name) private {
        candidates.push(Candidate(_name, 0));
    }

    // Fonction pour voter pour un candidat spécifique
    function vote(uint _candidateId, string memory _genre, uint _wilaya, uint _age) public onlyAllowedVoters {
        // Vérifie si l'électeur n'a pas encore voté
        require(!voters[msg.sender], "Vous avez deja vote.");

        // Vérifie si l'id du candidat est valide
        require(_candidateId < candidates.length, "Candidat invalide.");
        require(keccak256(abi.encodePacked(_genre)) == keccak256(abi.encodePacked("M")) || keccak256(abi.encodePacked(_genre)) == keccak256(abi.encodePacked("F")), "genre invalide.");
        require(_wilaya>0&&_wilaya<59, "wilaya invalide.");
        require(_age > 17, "age invalide.");

        // Enregistre le vote et marque l'électeur comme ayant voté
        voters[msg.sender] = true;
        candidates[_candidateId].voteCount++;
        totalVote++;

        if (keccak256(abi.encodePacked(_genre)) == keccak256(abi.encodePacked("M"))) {
            M++;
        } else {
            F++;
        }
        wilayaCount[_wilaya]++;
        if (_age <31) {
            jeun++;
        } else {
            if (_age<51) {
                agee++;
            } else {
                vieux++;
            }
        }

        // Déclenche l'événement de vote enregistré
        emit VoteRecorded(_candidateId);
    }

    // Fonction pour ajouter une personne autorisée à voter
    function allowVoter(address _voter) public onlyAdmin {
        allowedVoters[_voter] = true;
    }

    // Fonction pour récupérer les détails d'un candidat spécifique en fonction de l'ID
    function getCandidateDetails(uint _candidateId) public view returns (uint) {
        require(_candidateId < candidates.length, "Candidat invalide.");
        return (candidates[_candidateId].voteCount);
    }
    // Fonction pour récupérer le total des votes
    function getTotalVote() public view returns (uint) {
        return totalVote;
    }

    // Fonction pour récupérer le nombre de votes masculins
    function getMaleVotes() public view returns (uint) {
        return M;
    }

    // Fonction pour récupérer le nombre de votes féminins
    function getFemaleVotes() public view returns (uint) {
        return F;
    }

    // Fonction pour récupérer le nombre de votes par wilaya
    function getWilayaVotes(uint _wilaya) public view returns (uint) {
        require(_wilaya > 0 && _wilaya < 59, "Wilaya invalide.");
        return wilayaCount[_wilaya];
    }

    // Fonction pour récupérer le nombre de votes pour les jeunes (moins de 31 ans)
    function getYouthVotes() public view returns (uint) {
        return jeun;
    }

    // Fonction pour récupérer le nombre de votes pour les personnes d'âge moyen (de 31 à 50 ans)
    function getMiddleAgeVotes() public view returns (uint) {
        return agee;
    }

    // Fonction pour récupérer le nombre de votes pour les personnes âgées (plus de 50 ans)
    function getElderlyVotes() public view returns (uint) {
        return vieux;
    }

    // Fonction pour récupérer l'etat du voter
    function getVoterState(address _sender) public view returns (bool) {
        return voters[_sender];
    }

}
