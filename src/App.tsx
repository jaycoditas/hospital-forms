import React from "react";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DeleteUser from "./components/DeleteUser";
import AllDetails from "./components/forms/AllDetails";
import CardDetails from "./components/forms/CardDetails";
import FamilyDetails from "./components/forms/FamilyDetails";
import Login from "./components/forms/Login";
import PersonalDetails from "./components/forms/PersonalDetails";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          {/* //TODO  Uncomment once done*/}
          <Route element={<ProtectedRoute />}>
            <Route path="personal_info" element={<PersonalDetails />} />
            <Route path="family_info" element={<FamilyDetails />} />
            <Route path="cards_info" element={<CardDetails />} />
            <Route path="info" element={<AllDetails />} />
            <Route path="delete_user" element={<DeleteUser />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
