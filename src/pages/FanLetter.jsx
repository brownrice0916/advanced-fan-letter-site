import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { artists } from "../shared/artists";
import styled from "styled-components";

const StyledIntro = styled.section`
  background-color: pink;
  height: 300px;
`;

const StyledMembers = styled.div`
  display: flex;
  > ul {
    display: flex;
    text-align: center;
    // justify-content: space-between;
    width: auto;
    margin: 0 auto;
    align-items: center;
  }
`;

const StyledMemberCard = styled.li`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-color: ${(props) => (props.$isSelected ? "yellow" : "gray")};
`;

const StyledForm = styled.form`
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  background-color: #ededed;
  margin-top: 20px;
  > div {
    margin-bottom: 20px;
  }
`;
const FanLetter = () => {
  const params = useParams();

  const foundData = artists.find((item) => item.id === parseInt(params.id));
  const [members, setMembers] = useState(foundData.members);
  const [selectedMember, setSelectedMember] = useState(foundData.members[0]);

  // console.log(members);

  const selectMember = (member) => {
    //console.log(member.name + "이 선택되었습니다.");
    setSelectedMember(member);

    //setFanLetters(member.fanLetters);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const content = e.target.content.value;
    const changedMembers = members.map((member) => {
      if (member.id === selectedMember.id) {
        // 선택된 멤버의 경우 fanLetters를 업데이트한 새로운 객체를 반환
        return {
          ...member,
          fanLetters: [...member.fanLetters, { title, content }],
        };
      }
      return member; // 선택되지 않은 멤버는 그대로 반환
    });
    setMembers(changedMembers);
    //setFanLetters([...fanLetters, { title, content }]);

    // 선택된 멤버의 fanLetters 업데이트
    const updatedSelectedMember = changedMembers.find(
      (member) => member.id === selectedMember.id
    );
    setSelectedMember(updatedSelectedMember);
  };

  return (
    <>
      <StyledIntro>
        <h1>{members.name}</h1>
      </StyledIntro>

      <StyledMembers>
        <ul>
          {members.map((member) => (
            <StyledMemberCard
              key={member.id}
              $isSelected={member.id === selectedMember.id}
              onClick={() => {
                selectMember(member);
              }}
            >
              {member.name}
            </StyledMemberCard>
          ))}
        </ul>
      </StyledMembers>
      <StyledForm
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label>제목</label>
          <input type="text" name="title" />
        </div>
        <div>
          <label>내용</label>
          <textarea type="content" name="content" />
        </div>
        <div>
          <p>
            누구에게 보내실 건가요?{" "}
            <span>
              <select name="recipient">
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>
            </span>
          </p>
        </div>
        <input type="submit" value="등록" />
      </StyledForm>
      <div>
        {selectedMember.fanLetters.map((fanLetter) => (
          <div key={fanLetter.title}>
            <h3>{fanLetter.title}</h3>
            <p>{fanLetter.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FanLetter;
