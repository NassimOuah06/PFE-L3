import React from "react";
import { useVotersContext } from "../hooks/UseVotersContext";

const VotersTable = ({ voters }) => {
  const { dispatch } = useVotersContext();
  if (!voters) {
    return <div>Loading...</div>;
  }

  const handleDelete = async (voter) => {
    const response = await fetch(`/api/voters/${voter._id}`, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_VOTER", payload: json });
    }
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Wilaya</th>
            <th>Genre</th>
            <th>Année de Naissance</th>
            <th>Card ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) => (
            <tr key={voter._id}>
              <td>{voter.nom}</td>
              <td>{voter.prenom}</td>
              <td>{voter.wilaya}</td>
              <td>{voter.genre}</td>
              <td>{voter.anneeNaissance}</td>
              <td>{voter.cardId}</td>
              <td>
                <button className="yellow">Edit</button>
                <button className="red" onClick={() => handleDelete(voter)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VotersTable;
