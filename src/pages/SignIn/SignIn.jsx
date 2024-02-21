import SignForm from "components/SignForm";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __signInUser } from "../../redux/modules/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  const handleSignIn = async (id, pw) => {
    dispatch(__signInUser({ id: id, password: pw }));
  };

  return <SignForm handleSignIn={handleSignIn} />;
};

export default SignIn;
