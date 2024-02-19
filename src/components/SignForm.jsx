import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSignInWrapper = styled.div``;

const SignForm = () => {
  return (
    <StyledSignInWrapper>
      <h1>로그인</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input type="text" maxLength={10} placeholder="아이디(4-10글자)" />
        <input
          type="password"
          maxLength={15}
          placeholder="비밀번호(4-15글자)"
        />
        {/* <input type="text" maxLength={10} placeholder="닉네임(1-10글자)" /> */}
        <button
          onSubmit={() => {
            console.log("제출하였음");
          }}
        >
          로그인
        </button>
        <Link to="/signup">회원가입</Link>
      </form>
    </StyledSignInWrapper>
  );
};

export default SignForm;
