import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";
import { getLocalStorage, saveLocalStorage } from "common/common";
import Layout from "layout/Layout";
import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";

const Router = () => {
  const [selectedMemberId, setSelectedMemberId] = useState();

  useEffect(() => {
    if (!getLocalStorage("artists")) {
      saveLocalStorage("artists", datas);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {" "}
          <Route path="/" element={<Home />} />
          <Route
            path="/fanletter"
            element={
              <FanLetter
                selectedMemberId={selectedMemberId}
                setSelectedMemberId={setSelectedMemberId}
              />
            }
          />
          <Route path="/fanletter-detail" element={<FanLetterDetail />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
