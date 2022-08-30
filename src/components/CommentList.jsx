import React from 'react';
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from 'react-bootstrap/Form';

const CommentList = ({comments}) => {

  return (
    <div >
        {
        comments.map((comment, idx)=>
        <div key={idx} className='detail-comments'>
            <div>
            <span>{comment.nickname}</span>{" "}
            <span>{comment.content}</span>
            </div>
            <div>
             <span style={{fontSize:'11px'}}>{comment.createdAt}</span>
             </div>
        </div>
        )
        }
        <hr/>
        <div>
        <InputGroup>
        <Form.Control
          placeholder="일기에 대한 감상을 적어주세요"
        />
        <Button variant="outline-secondary">
          등록
        </Button>
      </InputGroup>
        </div>
  </div>
  )
}

export default CommentList