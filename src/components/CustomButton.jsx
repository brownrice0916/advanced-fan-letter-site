import React from "react";
import styled from "styled-components";

export const StyledButton = styled.button`
  cursor: pointer;
  background-color: #4dccc6;
  background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
  line-height: 42px;
  padding: 0;
  border: none;
  overflow: hidden;
  border-radius: 5px;
  :hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  span {
    padding: 2px 20px;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const CustomButton = ({ name, onClick }) => {
  return (
    <StyledButton onClick={onClick} className="submit_btn" type="submit">
      <span>{name}</span>
    </StyledButton>
  );
};

export default React.memo(CustomButton);
