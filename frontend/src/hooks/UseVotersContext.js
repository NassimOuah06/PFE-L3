import { VotersContext } from "../context/VoterContext";
import { useContext } from "react";

export const useVotersContext = () => {
    const context = useContext(VotersContext);
    if (!context) {
        throw new Error("useVotersContext must be used within a VotersContextProvider");
    }
    return context;
};