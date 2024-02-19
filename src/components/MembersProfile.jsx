import { StyledMembers } from "pages/FanLetter/FanLetter.styled";
import React from "react";
import MemberProfile from "./MemberProfile";

const MembersProfile = ({
  currentArtist,
  selectedMember,
  setSelectedMemberId,
}) => {
  return (
    <StyledMembers>
      <ul>
        {currentArtist.members.map((member) => (
          <MemberProfile
            key={member.id}
            member={member}
            selectedMember={selectedMember}
            setSelectedMemberId={setSelectedMemberId}
          />
        ))}
      </ul>
    </StyledMembers>
  );
};

export default React.memo(MembersProfile);
