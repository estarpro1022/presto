import { useState, useEffect } from "react";
import { getStore } from "../request";
import { PresentationContext } from "../config";


export const PresentationProvider = ({ children }) => {
  const [pres, setPres] = useState([]);

  const fetchPres = async () => {
    const data = await getStore(setPres);
    console.log("data:", data);
  };

  const clearPres = () => {
    setPres([]);
  };

  useEffect(() => {
    fetchPres();
  }, []);

  const deletePre = (id) => {
    setPres((prevPres) => prevPres.filter((pre) => pre.id !== id));
  };

  return (
    <PresentationContext.Provider
      value={{ pres, setPres, deletePre, fetchPres, clearPres }}
    >
      {children}
    </PresentationContext.Provider>
  );
};

export { PresentationContext };
