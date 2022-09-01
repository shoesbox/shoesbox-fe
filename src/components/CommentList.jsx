import React from "react";
import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { BsFillPenFill, BsXCircle } from "react-icons/bs";

const CommentList = ({ comments }) => {
  const commentRef = useRef();
  const [commentStatus, setComment] = useState(false);

  const onClickComment = () =>{
    if(
    commentRef.current.value.trim()!==''
    ){
    setComment(true);
    console.log(commentRef.current.value);
    commentRef.current.value = '';
    commentRef.current.focus();
    }
  }

  // const onChangeCommentStatus = (e) =>{
  //   if(e.target.value.trim()!==''){
  //     setComment(true);
  //   }
  // }

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
          <div className="detail-comment-btns">
            <Button><BsFillPenFill /></Button>{' '}<Button> <BsXCircle /></Button>
          </div>
        </div>
      ))}
      <hr />
      <div>
        <InputGroup>
          <Form.Control
            ref={commentRef}
            placeholder="일기에 대한 감상을 적어주세요"
            onKeyDown={(e)=>{
              if(e.key === 'Enter'){
                onClickComment();
              }
            }}
          />
          <Button variant="outline-secondary" disabled={commentStatus} onClick={onClickComment}>등록</Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default CommentList;
