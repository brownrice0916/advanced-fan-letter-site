import {
  StyledFanLetterCard,
  StyledFanLetterWrap,
} from "pages/FanLetter/FanLetter.styled";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const FanLetterCard = ({ selectedMember, currentArtist }) => {
  const currentLetters =
    selectedMember &&
    currentArtist.fanLetters.filter(
      (fanLetter) => fanLetter.writedTo === selectedMember.name
    );

  return (
    <StyledFanLetterWrap>
      {currentLetters && currentLetters.length === 0 && (
        <div className="noLetter">
          아직 등록된 팬레터가 없습니다. 첫 번째 팬레터의 주인공이 되세요!
        </div>
      )}
      {selectedMember &&
        currentLetters
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((fanLetter) => (
            <StyledFanLetterCard key={fanLetter.id}>
              {/* navigate(`/fanletter?search=${currentArtist.name}`); */}
              <Link
                to={
                  `/fanletter-detail?` +
                  new URLSearchParams({
                    search: currentArtist.name,
                    fanLetterId: fanLetter.id,
                  })
                }
              >
                <Avatar fanLetter={fanLetter}></Avatar>
                <div className="contents">
                  <h3>{fanLetter.nickname}</h3>
                  <p>{new Date(fanLetter.createdAt).toLocaleString("ko-KR")}</p>
                  <p>{fanLetter.content}</p>
                </div>
              </Link>
            </StyledFanLetterCard>
          ))}
    </StyledFanLetterWrap>
  );
};

export default React.memo(FanLetterCard);
