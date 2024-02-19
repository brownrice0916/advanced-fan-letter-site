import styled from "styled-components";

export const StyledFanLetterDetailContainer = styled.section`
  //display: flex;
  //justify-content: center;
  //align-items: center;
  // margin: 0 auto;
  padding: 20px;
  position: relative;
  //position: relative;
`;

export const StyledFanLetterDetailCard = styled.div`
  margin: 0 auto;
  min-height: 500px;
  width: 600px;
  padding: 20px;
  //transform: translateY(-50%);
  background-color: #fff;
  border: 1px solid black;
  border-radius: 20px;
  .writer_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      display: flex;
      align-items: center;
      > span {
        margin-left: 10px;
        font-size: 1.5rem;
      }
    }
  }
  .writed_to {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  article {
    width: 100%;
    height: 200px;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 10px;
    background-color: #ededed;
    overflow-wrap: break-word;
    padding: 10px;
  }
  .text_area {
    width: 100%;
    height: 200px;
    font-size: 1rem;
    padding: 10px;
    line-height: 1.5;
    border-radius: 10px;
  }
  .btn_wrap {
    display: flex;
    flex-direction: row-reverse;
    // justify-content: space-between;
    margin-top: 20px;
    button:nth-child(2) {
      margin-right: 10px;
    }
  }
`;

export const StyledCustomModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  width: 300px;
  height: 130px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  h2 {
    margin-bottom: 20px;
  }
  button:nth-child(2) {
    margin-right: 10px;
  }
`;
