// In OrderContext.js or a similarly named file
import React, { createContext, useState, useContext, useEffect } from 'react';

export const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext); // Define useOrder hook

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(''); // Initial state can be empty or some default value
  const [firstTestCompleted, setFirstTestCompleted] = useState(false);


  useEffect(() => {
    const isFirstBigFive = Math.random() < 0.5;
    setOrder(isFirstBigFive ? "bigfive" : "ncs6");
    console.log("First Component:", isFirstBigFive ? "BigFive" : "NCS6"); // Debugging output
  }, []);
  

  return (
    <OrderContext.Provider value={{ order, setOrder, firstTestCompleted, setFirstTestCompleted }}>
      {children}
    </OrderContext.Provider>
  );
};
