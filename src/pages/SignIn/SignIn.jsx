import axios from "axios";
import SignForm from "components/SignForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getUser, setUserInfo } from "../../redux/modules/auth";
import authApi from "../../axios/authApi";
import { saveLocalStorage, setLocalStorage } from "common/common";

const SignIn = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);
  const handleSignIn = async (id, pw) => {
    try {
      const response = await authApi.post("/login", {
        id: id,
        password: pw,
      });
      console.log(response.data);

      const { success, ...userInfoFromServer } = response.data;

      dispatch(setUserInfo(userInfoFromServer));
      setLocalStorage("accessToken", response.data.accessToken);
      navigate("/");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };
  return <SignForm handleSignIn={handleSignIn} />;
};

export default SignIn;
