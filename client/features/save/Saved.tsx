//save component

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { getSaved, selectSaved, addSavedRestroom } from "./saveSlice";

export const handleSavedButtonClick = () => {
  console.log("handlesave Saved.tsx clicked")
}

export const handleAddSavedRestroom = () => {
  console.log("handleaddsavedrestroom clicked")
};

const Saved = () => {
  const dispatch = useDispatch()
  const savedRestrooms = useSelector(selectSaved)

  useEffect(() => {
    dispatch(getSaved())
  }, [dispatch])


  return (
    <div id='savedRestrooms'>
      {Array.isArray(savedRestrooms) && savedRestrooms.map((restroom) => {
        <h1>{restroom.name}</h1>
      })}
  </div>
  )
}

export default Saved
// export { handleAddSavedRestroom };
