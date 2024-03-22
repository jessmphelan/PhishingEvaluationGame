import React, { createContext, useContext, useState } from 'react';

// Step 1: Create the Context
const PlayerIDContext = createContext();

// Step 2: Create a custom hook to use the context
export const usePlayerID = () => useContext(PlayerIDContext);

// Step 3: Create a Provider component
export const PlayerIDProvider = ({ children }) => {
  const [playerID, setPlayerID] = useState('');

  return (
    <PlayerIDContext.Provider value={{ playerID, setPlayerID }}>
      {children}
    </PlayerIDContext.Provider>
  );
};
