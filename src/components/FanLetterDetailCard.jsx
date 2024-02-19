import { StyledFanLetterDetailCard } from "pages/FanLetterDetail/FanLetterDetail.styled";
import React, { useEffect, useRef } from "react";
import Avatar from "./Avatar";
import CustomButton from "./CustomButton";

const FanLetterDetailCard = ({
  currentLetter,
  isEditing,
  letterContent,
  setLetterContent,
  openDeleteModal,
  handleEdit,
  isEditModalOpen,
  openEditModal,
}) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      if (!isEditModalOpen) {
        textAreaRef.current.focus();
        // Move the cursor to the end of the textarea content
        textAreaRef.current.setSelectionRange(
          letterContent.length,
          letterContent.length
        );
      }
    }
  }, [textAreaRef, letterContent.length, isEditModalOpen, isEditing]);

  return (
    <StyledFanLetterDetailCard>
      <div className="writer_wrap">
        <div>
          <Avatar fanLetter={currentLetter} />
          <span>{currentLetter.nickname}</span>
        </div>
        <p>{new Date(currentLetter.createdAt).toLocaleString("ko-KR")}</p>
      </div>
      <p className="writed_to">To.{currentLetter.writedTo}</p>
      {!isEditing ? (
        <article style={{ whiteSpace: "pre-wrap" }}>{letterContent}</article>
      ) : (
        <textarea
          ref={textAreaRef}
          className="text_area"
          value={letterContent}
          maxLength={100}
          type="content"
          name="content"
          onChange={(event) => {
            setLetterContent(event.target.value);
          }}
        ></textarea>
      )}
      <div className="btn_wrap">
        {!isEditing && <CustomButton onClick={openDeleteModal} name="삭제" />}
        {!isEditing && <CustomButton onClick={handleEdit} name="수정" />}
        {isEditing && <CustomButton onClick={openEditModal} name="수정완료" />}
      </div>
    </StyledFanLetterDetailCard>
  );
};

export default React.memo(FanLetterDetailCard);
