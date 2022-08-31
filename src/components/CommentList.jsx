import React from "react";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

const CommentList = ({ comments }) => {
  const commentRef = useRef();

  const onClickBtn = () =>{
    console.log(commentRef.current.value);
    commentRef.current.value = '';
    commentRef.autoFucus();
  }

  return (
    <div className="detail-comments-wrap">
      {comments.map((comment, idx) => (
        <div key={idx} className="detail-comments">
          <div className="detail-comment-contents">
            <span><strong>{comment.nickname}</strong> {comment.content}</span>
          </div>
          {/* <div>
            <span className="detail-comment-time">{comment.createdAt}</span>
          </div> */}
        </div>
      ))}
      <hr />
      <div>
        <InputGroup>
          <Form.Control
            ref={commentRef}
            placeholder="일기에 대한 감상을 적어주세요"
          />
          <Button variant="outline-secondary" onClick={onClickBtn}>등록</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default CommentList;
