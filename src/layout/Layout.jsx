import React from "react";
import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";

const StyledLayout = styled.div`
  //background-color: #ededed;
  height: 100vh;
`;
const StyledHeader = styled.header`
  height: 80px;
  background-color: #fff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h1 {
    cursor: pointer;
  }
  > a {
    text-decoration: none;
    color: #4dccc6;
    font-weight: 800;
    font-size: 2rem;
  }
`;

const StyledFooter = styled.footer`
  height: 80px;
  /* background-color: orange; */
  padding: 12px;
  display: flex;
  margin-top: 50px;
  align-items: center;
  justify-content: center;
`;

const StyledLoginWrap = styled.div``;
const Layout = ({ children, setSelectedMember }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <Link to="/" onClick={() => setSelectedMember("")}>
          Fan Letter
        </Link>
        <StyledLoginWrap>
          <Link to="/signIn" onClick={() => setSelectedMember("")}>
            로그인/
          </Link>
          <Link to="/signUp" onClick={() => setSelectedMember("")}>
            회원가입
          </Link>
        </StyledLoginWrap>
      </StyledHeader>
      <Outlet />
      <StyledFooter>© SSAL COMPANY</StyledFooter>
    </StyledLayout>
  );
};

export default Layout;
