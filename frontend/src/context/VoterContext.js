import { createContext, useReducer } from "react";

export const VotersContext = createContext();

export const votersReducer = (state, action) => {
  switch (action.type) {
    case "SET_VOTERS":
      return {
        voters: action.payload,
      };
    case "CREATE_VOTER":
      return {
        voters: [action.payload, ...state.voters],
      };
    case "DELETE_VOTER":
      return {
        voters: state.voters.filter((v) => v._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const VotersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(votersReducer, { voters: null });
  return (
    <VotersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VotersContext.Provider>
  );
};
