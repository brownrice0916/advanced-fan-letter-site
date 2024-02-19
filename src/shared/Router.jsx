import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import FanLetter from "../pages/FanLetter/FanLetter";
import FanLetterDetail from "../pages/FanLetterDetail/FanLetterDetail";
import { datas } from "./artists";
import { getLocalStorage, saveLocalStorage } from "common/common";
import Layout from "layout/Layout";
import SignIn from "pages/SignIn/SignIn";
import SignUp from "pages/SignUp/SignUp";
import Profile from "pages/Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import authApi from "../axios/authApi";
import { setUserInfo } from "../redux/modules/auth";

const Router = () => {
  const [selectedMemberId, setSelectedMemberId] = useState();
  const userInfo = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  useEffect(() => {
    if (!getLocalStorage("artists")) {
      saveLocalStorage("artists", datas);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi.get("/user", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getLocalStorage("accessToken")}`,
          },
        });
        console.log("getUser", response.data);
        const { success, ...user } = response.data;
        dispatch(setUserInfo(user));
      } catch (error) {
        //console.log(error);
      }
    };

    console.log("accessToken in router", getLocalStorage("accessToken"));
    if (getLocalStorage("accessToken")) {
      fetchUser();
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
