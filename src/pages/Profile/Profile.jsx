import authApi from "../../axios/authApi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, updateUserInfo } from "../../redux/modules/auth";

const Profile = () => {
  const userInfo = useSelector((state) => state.user);
  const [imageUrl, setImageUrl] = useState(userInfo?.avatar);
  const [nickname, setNickname] = useState(userInfo?.nickname);
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

    try {
      const response = await authApi.patch("/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.accessToken}`,
        },
      });
      console.log(response);

      const { avatar, nickname: updatedNickName } = response.data;

      const profileToUpdate = {
        nickname: updatedNickName,
      };

      if (avatar) {
        profileToUpdate.avatar = avatar;
      }

      dispatch(updateProfile(profileToUpdate));

      //   dispatch(updateProfile({
      //     nickname: updatedNickName,
      //     ...(avatar && { avatar })
      //   }));

      if (avatar) {
        setImageUrl(avatar);
      }

      setNickname("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <h1>프로필관리</h1>

      <img src={imageUrl} alt="profile" />
      <input
        type="file"
        onChange={handleImageChange}
        name="profileInput"
        accept="image/*"
      />
      <input onChange={handleNicknameChange} value={nickname} />
      <button onClick={handleProfile}>완료</button>
    </div>
  );
};

export default Profile;
