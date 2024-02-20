import axios from "axios";
import SignForm from "components/SignForm";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __getUser, __signInUser, setUserInfo } from "../../redux/modules/auth";
import authApi from "../../axios/authApi";
import { saveLocalStorage, setLocalStorage } from "common/common";

const SignIn = () => {
  // const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const userInfo = useSelector((state) => state.user);
  const { isLoading, error, user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const handleSignIn = async (id, pw) => {
    dispatch(__signInUser({ id: id, password: pw }));
    // try {
    //   const response = await authApi.post("/login", {
    //     id: id,
    //     password: pw,
    //   });
    //   console.log(response.data);

    //   const { success, ...userInfoFromServer } = response.data;

    //   dispatch(setUserInfo(userInfoFromServer));
    //   setLocalStorage("accessToken", response.data.accessToken);
    //   navigate("/");
    // } catch (error) {
    //   setError(error);
    //   console.log(error);
    // }
  };
  if (isLoading) {
    return <div>로딩 중....</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <SignForm handleSignIn={handleSignIn} />;
};

export default SignIn;
