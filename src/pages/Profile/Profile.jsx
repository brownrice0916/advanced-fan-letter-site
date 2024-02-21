import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __updateProfile } from "../../redux/modules/auth";
import styled from "styled-components";

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

      <div className="imgWrap">
        <img className="profile" src={imageUrl} alt="profile" />
        <label className="inputButton" for="input-file"></label>
        <input
          className="fileInput"
          id="input-file"
          type="file"
          onChange={handleImageChange}
          name="profileInput"
          accept="image/*"
        />
      </div>

      <div>
        <label>닉네임:</label>{" "}
        <input onChange={handleNicknameChange} value={nickname} />
      </div>
      <button className="doneBtn" onClick={handleProfile}>
        완료
      </button>
    </StyledProfileContainer>
  );
};

export default Profile;

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

  .imgWrap {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 auto;
    //background-color: blue;
    border-radius: 100px;
    overflow: hidden;
    cursor: pointer;
  }
  .profile {
    position: absolute;
    width: 100%;
    left: 0;
    height: 100%;
  }
  h1 {
    font-size: 2rem;
    text-align: center;
  }

  .doneBtn {
    width: 200px;
    margin: 0 auto;
    background-color: black;
    color: #fff;
    height: 40px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .fileInput {
    position: absolute;
    width: 100%;
    height: 100%;
    color: blue;
    left: 0;
    visibility: hidden;
    z-index: 3;
  }
  .inputButton {
    //padding: 6px 25px;
    background-color: transparent;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
  }
`;
