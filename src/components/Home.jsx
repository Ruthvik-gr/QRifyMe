import React from "react";
import { NavBar } from "./NavBar";
import { Route, Routes } from "react-router-dom";
import { StudentDetails } from "./StudentDetails";
import { Automobiles } from "./Automobiles";
import { HealthCare } from "./HealthCare";

export const Home = () => {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div>
        <div style={{ gridArea: "main", height: "100%", overflow: "auto" }}>
          <Routes>
            {/* <Route path="products/opener" Component={Home} /> */}
            <Route path="studentdetails/" Component={StudentDetails} />
            <Route path="automobiles/" Component={Automobiles} />
            <Route path="healthcare/" Component={HealthCare} />
          </Routes>
        </div>
      </div>
    </>
  );
};
