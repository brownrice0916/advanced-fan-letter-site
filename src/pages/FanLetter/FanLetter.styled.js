import styled from "styled-components";

export const StyledFanPage = styled.section`
  background-color: #fff;
`;

export const StyledIntro = styled.section`
  background-image: url(${(props) => props.$img});
  height: 350px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding: 20px;
  > h1 {
    font-weight: 800;
    font-size: 2rem;
    color: #fff;
  }
`;

export const StyledMembers = styled.div`
  display: flex;
  margin-top: 20px;
  > ul {
    display: flex;
    text-align: center;
    // justify-content: space-between;
    width: auto;
    margin: 0 auto;
    align-items: center;
  }
`;

export const StyledMemberCard = styled.li`
  width: 100px;
  height: 150px;

  box-sizing: initial;

  cursor: pointer;
  overflow: hidden;
  margin: 10px;
  > div {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    border: ${(props) =>
      props.$isSelected ? "5px solid #4dccc6" : "5px solid #ededed"};
  }
  img {
    width: 100%;
  }
`;

export const StyledForm = styled.form`
  margin: 0 auto;
  //text-align: center;
  padding: 20px;
  background-color: #ededed;
  width: 500px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;
  .inputWrap {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    label {
      flex: 1;
    }
    input,
    textarea {
      flex: 3;
    }
  }
  > input[type="submit"] {
    cursor: pointer;
  }
  .btn_wrap {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const StyledButton = styled.button`
  cursor: pointer;
  background-color: #4dccc6;
  background-image: linear-gradient(315deg, #4dccc6 0%, #96e4df 74%);
  line-height: 42px;
  padding: 0;
  border: none;
  padding: 2px 20px;
  border-radius: 5px;
  :hover {
    background-color: #89d8d3;
    background-image: linear-gradient(315deg, #89d8d3 0%, #03c8a8 74%);
  }
  span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
`;

export const StyledFanLetterWrap = styled.ul`
  display: flex;
  justify-content: center;
  flex-direction: column;
  .noLetter {
    text-align: center;
    border: 1px solid black;
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    background-color: rgba(77, 204, 198, 0.5);
  }
`;

export const StyledFanLetterCard = styled.li`
  border: 1px solid black;
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 20px;
  /* background-color: pink; */
  border-radius: 5px;
  > a {
    display: flex;
    .imgWrap {
      flex: 1;
      img {
        width: 70px;
        height: 70px;
        border-radius: 100%;
        margin-right: 20px;
      }
    }

    .contents {
      margin-left: 10px;
      flex: 3;
      // background-color: black;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      // align-items: center;
      justify-content: center;
      > h3 {
        font-size: 1.2rem;
        margin-bottom: 20px;
      }
      > p:nth-child(3) {
        //font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: rgba(77, 204, 198, 0.5);

        margin-top: 20px;
        padding: 20px;
        border-radius: 10px;
      }
    }
  }
`;
