import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { getLocalStorage, saveLocalStorage } from "common/common";
import Layout from "layout/Layout";
import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";
import Profile from "pages/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import { __getUser } from "../redux/modules/auth";
import { __getArtists } from "../redux/modules/artists";

const Router = () => {
  const [selectedMemberId, setSelectedMemberId] = useState();
  const dispatch = useDispatch();
  const { artists } = useSelector((state) => state.artists);

  useEffect(() => {
    dispatch(__getArtists());
  }, [dispatch]);

  useEffect(() => {
    if (artists) {
      saveLocalStorage("artists", artists);
    }
  }, [artists]);

  useEffect(() => {
    if (getLocalStorage("accessToken")) {
      dispatch(__getUser(getLocalStorage("accessToken")));
    }
  }, [dispatch]);

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
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
