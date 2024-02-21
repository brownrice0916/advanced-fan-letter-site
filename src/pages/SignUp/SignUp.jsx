import SignForm from "components/SignForm";
import { useNavigate } from "react-router-dom";
import authApi from "../../axios/authApi";
import { REGISTER_ENDPOINT } from "constants/userConstants";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = async (id, pw, nickname) => {
    try {
      await authApi.post(REGISTER_ENDPOINT, {
        id: id,
        password: pw,
        nickname: nickname,
      });
      navigate("/signin");
    } catch (error) {
      alert(error.message);
    }
  };

  return <SignForm handleSignUp={handleSignUp} />;
};

export default SignUp;
