import React, { createContext, useContext, useState } from 'react';

const PlayerIDContext = createContext();

export const usePlayerID = () => useContext(PlayerIDContext);

export const PlayerIDProvider = ({ children }) => {
  const [playerID, setPlayerID] = useState('');

  return (
    <PlayerIDContext.Provider value={{ playerID, setPlayerID }}>
      {children}
    </PlayerIDContext.Provider>
  );
};
