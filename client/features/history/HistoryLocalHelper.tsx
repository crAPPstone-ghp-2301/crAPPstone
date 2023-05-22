export const getLocalStorage = () => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  };
  
  export const setLocalStorage = (history) => {
    localStorage.setItem("history", JSON.stringify(history));
  };

  export const addToLocalStorage = (restroom) => {
    const history = getLocalStorage();
    const restroominhistory = history.find((historyItem) => historyItem.id_restroom ===restroom.id_restroom);
  
    if (restroominhistory) {
      return
    } else {
      const item = { ...restroom };
      history.push(item);
    }
    setLocalStorage(history);
  };
  

  export const  clearLocalStorage=()=> {
    localStorage.clear();
    return [];
  }