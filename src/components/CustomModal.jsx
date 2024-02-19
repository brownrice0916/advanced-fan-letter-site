import { StyledCustomModal } from "pages/FanLetterDetail/FanLetterDetail.styled";
import React from "react";
import CustomButton from "./CustomButton";

const CustomModal = ({ handleYes, handleNo, type }) => {
  return (
    <StyledCustomModal>
      <h2>정말로 {type}하시겠습니까?</h2>
      <CustomButton onClick={handleYes} name="네" />
      <CustomButton onClick={handleNo} name="아니오" />
    </StyledCustomModal>
  );
};

export default CustomModal;
