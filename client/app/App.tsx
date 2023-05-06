import React from "react";
import AppRoutes from "./AppRoutes";
import Map from "./Map";
import SideBar from "../features/navigation/SideBar";
import Search from "../features/navigation/Search";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Map />
      <SideBar />
      {/* <Search /> */}
    </>
  );
};

export default App;
