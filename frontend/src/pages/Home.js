import React, { useEffect } from "react";
import VotersTable from "../components/VotersTable";
import VotersForm from "../components/VotersForm";
import { useVotersContext } from "../hooks/UseVotersContext";
const Home = () => {
  const { voters, dispatch } = useVotersContext();
  useEffect(() => {
    const fetchVoters = async () => {
      try {
        const response = await fetch("/api/voters");
        if (!response.ok) {
          throw new Error("Failed to fetch voters");
        }
        const json = await response.json();
        dispatch({ type: "SET_VOTERS", payload: json });
      } catch (error) {
        console.error("Error fetching voters:", error);
      }
    };

    fetchVoters();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="table">
        <h2>Voters Information</h2>
        <VotersTable voters={voters} /> {/* Render the VotersTable component */}
      </div>
      <div>
        <VotersForm />
      </div>
    </div>
  );
};

export default Home;
