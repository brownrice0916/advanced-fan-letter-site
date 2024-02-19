import React from "react";
import styled from "styled-components";

export const StyledAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Avatar = ({ fanLetter }) => {
  return (
    <StyledAvatar>
      <img
        src={
          fanLetter.avatar
            ? fanLetter.avatar
            : `../../assets/basic_profile.jpeg`
        }
        alt={fanLetter.nickname}
      />
    </StyledAvatar>
  );
};

export default React.memo(Avatar);
