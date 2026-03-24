import { useState } from "react";
import { useVotersContext } from "../hooks/UseVotersContext";

const VotersForm = () => {
  const { dispatch } = useVotersContext();
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [genre, setGenre] = useState("");
  const [anneeNaissance, setAnneeNaissance] = useState("");
  const [cardId, setCardId] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const voter = {
      nom,
      prenom,
      wilaya,
      genre,
      anneeNaissance,
      cardId,
    };
    const response = await fetch("/api/voters", {
      method: "POST",
      body: JSON.stringify(voter),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.msg);
      setEmptyFields(json.emptyFields);
    }

    if (response.ok) {
      setError(null);
      setNom("");
      setPrenom("");
      setWilaya("");
      setGenre("");
      setAnneeNaissance("");
      setCardId("");
      setEmptyFields([]);
      console.log("new voter added", json);
      dispatch({ type: "CREATE_VOTER", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Ajouter un nouveau voter</h3>
      <label>Nom</label>
      <input
        type="text"
        onChange={(e) => setNom(e.target.value)}
        value={nom}
        className={emptyFields.includes("nom") ? "error" : ""}
      />
      <label>Prenom</label>
      <input
        type="text"
        onChange={(e) => setPrenom(e.target.value)}
        value={prenom}
        className={emptyFields.includes("prenom") ? "error" : ""}
      />
      <label>Wilaya</label>
      <input
        type="number"
        min="1"
        max="58"
        onChange={(e) => setWilaya(e.target.value)}
        value={wilaya}
        className={emptyFields.includes("wilaya") ? "error" : ""}
      />
      <label>Genre</label>
      <select
        onChange={(e) => setGenre(e.target.value)}
        value={genre}
        className={emptyFields.includes("genre") ? "error" : ""}
      >
        <option value="">Select</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </select>
      <label>Année de Naissance</label>
      <input
        type="number"
        onChange={(e) => setAnneeNaissance(e.target.value)}
        value={anneeNaissance}
        className={emptyFields.includes("anneeNaissance") ? "error" : ""}
      />
      <label>Card ID</label>
      <input
        type="number"
        onChange={(e) => setCardId(e.target.value)}
        value={cardId}
        className={emptyFields.includes("cardId") ? "error" : ""}
      />
      <button>Ajouter</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default VotersForm;
