import React from "react";
import { useSelector } from "react-redux";
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
  const userInfo = useSelector((state) => state.user);
  return (
    <StyledLayout>
      <StyledHeader>
        <Link to="/" onClick={() => setSelectedMember("")}>
          Fan Letter
        </Link>
        {!userInfo && (
          <StyledLoginWrap>
            <Link to="/signin" onClick={() => setSelectedMember("")}>
              로그인/
            </Link>
            <Link to="/signup" onClick={() => setSelectedMember("")}>
              회원가입
            </Link>
          </StyledLoginWrap>
        )}
        {userInfo && <Link to="profile">프로필</Link>}
      </StyledHeader>
      <Outlet />
      <StyledFooter>© SSAL COMPANY</StyledFooter>
    </StyledLayout>
  );
};

export default Layout;
