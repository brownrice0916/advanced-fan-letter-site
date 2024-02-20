import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledSignInWrapper = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1.2rem;
  h1 {
    font-size: 2rem;
  }
  form {
    display: flex;
    gap: 20px;
    flex-direction: column;
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      input {
        width: 80%;
        height: 40px;
      }
    }
  }
  .formBtn {
    background-color: #222;
    color: #fff;
    border: none;
    padding: 20px;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .linkBtn {
    cursor: pointer;
  }
`;

const SignForm = ({ handleSignUp, handleSignIn }) => {
  const { pathname } = useLocation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = e.target.id.value;
    const password = e.target.password.value;

    if (pathname === "/signin") {
      handleSignIn(id, password);
    } else {
      const nickname = e.target.nickname.value;
      handleSignUp(id, password, nickname);
    }
  };

  return (
    <StyledSignInWrapper>
      <h1>{pathname === "/signin" ? "로그인" : "회원가입"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>아이디</label>
          <input
            type="text"
            name="id"
            maxLength={10}
            placeholder="아이디(4-10글자)"
            autoComplete="username"
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            maxLength={15}
            placeholder="비밀번호(4-15글자)"
            autoComplete="current-password"
          />
        </div>
        {pathname === "/signup" && (
          <div>
            <label>닉네임</label>
            <input
              type="text"
              name="nickname"
              maxLength={10}
              placeholder="닉네임(1-10글자)"
            />
          </div>
        )}
        <input
          className="formBtn"
          type="submit"
          value={pathname === "/signup" ? "회원가입" : "로그인"}
        />

        <Link
          className="linkBtn"
          to={pathname === "/signup" ? "/signin" : "/signup"}
        >
          {" "}
          {pathname === "/signup" ? "로그인" : "회원가입"}
        </Link>
      </form>
    </StyledSignInWrapper>
  );
};

export default SignForm;
