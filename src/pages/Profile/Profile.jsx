import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __updateProfile } from "../../redux/modules/auth";
import styled from "styled-components";

const StyledProfileContainer = styled.div`
  width: 500px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 15px;

  h1 {
    font-size: 2rem;
    text-align: center;
  }
  img {
    width: 100px;
  }
`;
const Profile = () => {
  const { user, error } = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState(user?.avatar);
  const [nickname, setNickname] = useState(user?.nickname);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    setFile(file);
    fileReader.onload = (data) => {
      setImageUrl(data.target.result);
    };
  };

  const handleProfile = async () => {
    const formData = new FormData();

    if (!nickname) return alert("닉네임을 입력해주세요");

    if (file) formData.append("avatar", file);
    formData.append("nickname", nickname);

    dispatch(__updateProfile(formData));
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  useEffect(() => {
    if (error) {
      alert(error.message);
    }
  }, [error]);

  return (
    <StyledProfileContainer>
      <h1>프로필관리</h1>

      <div>
        <img src={imageUrl} alt="profile" />
      </div>
      <div>
        <input
          className="fileInput"
          type="file"
          onChange={handleImageChange}
          name="profileInput"
          accept="image/*"
        />
      </div>
      <div>
        <input onChange={handleNicknameChange} value={nickname} />
        <button onClick={handleProfile}>완료</button>
      </div>
    </StyledProfileContainer>
  );
};

export default Profile;
