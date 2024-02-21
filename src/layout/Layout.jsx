import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { resetUser } from "../redux/modules/auth";
import styled from "styled-components";

const Layout = ({ setSelectedMember }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <StyledLayout>
      <StyledHeader>
        <Link to="/" onClick={() => setSelectedMember("")}>
          Fan Letter
        </Link>
        {!user && (
          <StyledLoginWrap>
            <Link
              className="login"
              to="/signin"
              onClick={() => setSelectedMember("")}
            >
              로그인
            </Link>
            <Link
              className="join"
              to="/signup"
              onClick={() => setSelectedMember("")}
            >
              회원가입
            </Link>
          </StyledLoginWrap>
        )}
        {user && (
          <StyledProfile>
            <Link to="profile">프로필</Link>
            <button
              onClick={() => {
                dispatch(resetUser());
              }}
            >
              로그아웃
            </button>
          </StyledProfile>
        )}
      </StyledHeader>
      <Outlet />
      <StyledFooter>© SSAL COMPANY</StyledFooter>
    </StyledLayout>
  );
};

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

const StyledLoginWrap = styled.div`
  .login {
    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 5px;
    &:hover {
      color: #4dccc6;
    }
  }
  .join {
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      color: #4dccc6;
    }
  }
`;

const StyledProfile = styled.div`
  a {
    font-size: 1.2rem;
    cursor: pointer;
    margin-right: 5px;
    &:hover {
      color: #4dccc6;
    }
  }
  button {
    background-color: transparent;
    border: none;
    font-size: 1.2rem;
    &:hover {
      color: #4dccc6;
    }
    cursor: pointer;
  }
`;

export default Layout;
