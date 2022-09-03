import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./css/writePage.css";

const WritePage = () => {
  const [validated, setValidated] = useState(false);
  const [inputValue, setValue] =  useState('');
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    event.preventDefault();
    setValidated(true);
  };

  const onKeyPrevent = (e) => {
    if (e.keyCode === 13) {
    //   console.log("enter가 입력되었습니다.");
      e.preventDefault();
    }
  };
  
  const onChangeInput = (e) => {
    setValue(e.target.value)}

  return (
    <Container fluid className="write-wrap">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>일기주제</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="오늘의 요약!"
            autoFocus
          />
          <Form.Control.Feedback type="invalid">
            일기주제를 적어주세요📔
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>사진추가</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="file"
              accept="image/gif, image/jpeg, image/png"
              multiple
              required
            />
            <Form.Control.Feedback type="invalid">
              사진을 추가해주세요📷
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>일기내용</Form.Label>
          <Form.Control
            className="write-content"
            type="text"
            placeholder="오늘은 무슨 일이 있었나요?"
            required
            value={inputValue}
            hidden
            readOnly
            onKeyDown={(e) => onKeyPrevent(e)}
          />
          <textarea className="write-content" placeholder="오늘은 무슨 일이 있었나요?"
          onChange={onChangeInput}
            required />
          <Form.Control.Feedback type="invalid">
            일기내용을 적어주세요🖋
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button type="submit">등록하기</Button>
      </Form>
    </Container>
  );
};

export default WritePage;
