import React from 'react';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { BsFillEraserFill, BsX } from 'react-icons/bs';

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
  };

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
            <span>{comment.nickname}</span>
            <span>{comment.content}</span>
          </div>
          {/* <div>
            <span className="detail-comment-time">{comment.createdAt}</span>
          </div> */}
          <div className="detail-comment-btns">
            <Button>
              <BsFillEraserFill />
            </Button>
            <Button>
              <BsX />
            </Button>
          </div>
        </div>
      ))}
      <hr />
      <div>
        <InputGroup>
          <Form.Control
            ref={commentRef}
            placeholder="친구에게 안부를 물어봅시다 :)"
          />
          <Button variant="outline-secondary" onClick={onClickBtn}>
            등록
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default CommentList;
