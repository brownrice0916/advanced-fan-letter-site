import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const StyledSignInWrapper = styled.div``;

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
        <input
          type="text"
          name="id"
          maxLength={10}
          placeholder="아이디(4-10글자)"
          autoComplete="username"
        />
        <input
          type="password"
          name="password"
          maxLength={15}
          placeholder="비밀번호(4-15글자)"
          autoComplete="current-password"
        />
        {pathname === "/signup" && (
          <input
            type="text"
            name="nickname"
            maxLength={10}
            placeholder="닉네임(1-10글자)"
          />
        )}
        <input
          type="submit"
          value={pathname === "/signup" ? "회원가입" : "로그인"}
        />

        <Link to={pathname === "/signup" ? "/signin" : "/signup"}>
          {" "}
          {pathname === "/signup" ? "로그인" : "회원가입"}
        </Link>
      </form>
    </StyledSignInWrapper>
  );
};

export default SignForm;
