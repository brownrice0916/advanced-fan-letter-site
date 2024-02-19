import axios from "axios";
import SignForm from "components/SignForm";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (id, pw, nickname) => {
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id: id,
          password: pw,
          nickname: nickname,
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return <SignForm handleSignUp={handleSignUp} />;
};

export default SignUp;
