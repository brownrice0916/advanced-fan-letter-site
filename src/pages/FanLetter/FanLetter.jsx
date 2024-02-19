import React, { useCallback, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { StyledIntro, StyledFanPage } from "./FanLetter.styled";
import FanLetterForm from "components/FanLetterForm";
import FanLetterCard from "components/FanLetterCard";
import MembersProfile from "components/MembersProfile";
import { useDispatch, useSelector } from "react-redux";
import { addFanLetter } from "../../redux/modules/artistsReducer";

const FanLetter = ({ selectedMemberId, setSelectedMemberId }) => {
  const artists = useSelector((state) => state.artistsReducer);
  const dispatch = useDispatch();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const artistName = queryParams.get("search");

  const currentArtist = useMemo(
    () => artists.find((item) => item.name === artistName),
    [artists, artistName]
  );

  useEffect(() => {
    // fanLetter page 진입 시 selectedMemberId 초기화
    setSelectedMemberId((prev) => (prev ? prev : currentArtist.members[0].id));
  }, [currentArtist, setSelectedMemberId]);

  const selectedMember = useMemo(() => {
    return currentArtist.members.find(
      (member) => member.id === selectedMemberId
    );
  }, [currentArtist, selectedMemberId]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nickname = e.target.nickname.value;
      const content = e.target.content.value;

      if (nickname === "" || content === "") {
        alert("닉네임과 내용은 필수 입력값입니다");
        return;
      }

      dispatch(
        addFanLetter(
          currentArtist.id,
          nickname,
          content,
          selectedMember?.name ?? ""
        )
      );

      e.target.nickname.value = "";
      e.target.content.value = "";
    },
    [currentArtist, dispatch, selectedMember]
  );

  return (
    <StyledFanPage>
      <StyledIntro $img={currentArtist.img}>
        <h1>{currentArtist.name}</h1>
      </StyledIntro>
      <MembersProfile
        currentArtist={currentArtist}
        selectedMember={selectedMember}
        setSelectedMemberId={setSelectedMemberId}
      />
      <FanLetterForm
        handleSubmit={handleSubmit}
        currentArtist={currentArtist}
        selectedMember={selectedMember}
        setSelectedMemberId={setSelectedMemberId}
      />

      {currentArtist && selectedMember && (
        <FanLetterCard
          selectedMember={selectedMember}
          currentArtist={currentArtist}
        />
      )}
    </StyledFanPage>
  );
};

export default FanLetter;
