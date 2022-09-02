import React, { useState, useRef, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./css/writePage.css";

const WritePage = () => {
  // formdata
  let formData = new FormData();
  // input validation check
  const [validated, setValidated] = useState(false);
  const [inputValue, setValue] = useState("");
  // refs
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  // image states
  const [files, setFiles] = useState();
  const [base64s, setBase64s] = useState([]);

  // 첨부 파일 검증
  const fileValidation = (obj) => {
    const fileTypes = ["image/gif", "image/jpeg", "image/png"];
    if (obj.name.length > 100) {
      alert("파일명이 100자 이상인 파일은 제외되었습니다.");
      return false;
    } else if (obj.size > 100 * 1024 * 1024) {
      alert("최대 파일 용량인 100MB를 초과한 파일은 제외되었습니다.");
      return false;
    } else if (obj.name.lastIndexOf(".") == -1) {
      alert("확장자가 없는 파일은 제외되었습니다.");
      return false;
    } else if (!fileTypes.includes(obj.type)) {
      alert("첨부가 불가능한 파일은 제외되었습니다.");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      console.log(form.value);
      setValidated(true);
    }
  };

  const onKeyPrevent = (e) => {
    if (e.keyCode === 13) {
      //   console.log("enter가 입력되었습니다.");
      e.preventDefault();
    }
  };

  // const onChangePic = (e) => {
  //   setFiles(e.target.files);
  // };

  // 2. onChange에서 바로 처리
  const onChangePic = (e) => {
    const imageList = e.target.files;
    // setBase64s([]);
    if (imageList.length !== 0) {
      setFiles(imageList);
      for (var i = 0; i < imageList.length; i++) {
        if (fileValidation(imageList[i])) {
          const reader = new FileReader();
          reader.readAsDataURL(imageList[i]);
          reader.onloadend = () => {
            setBase64s((prev) => [...prev, reader.result]);
          };
        }
      }
    }
    console.log("base64s in ChangePic", base64s);
  };

  useEffect(() => {
    console.log("files", files);
    console.log("base64s", base64s);
  }, [files]);

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  // 1. promise 객체를 이용해서 처리
  // image File을 파라미터로 받아 인코딩하는 코드
  // Promise 객체가 반환된다는 것을 유의
  // resolve: 작업이 성공한 경우 호출할 콜백
  // reject: 작업이 실패한 경우 호출할 콜백
  // const encodeFileToBase64 = (image) => {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     // *base64로 인코딩한 문자열을 FileReader 인스턴스의 속성에 담아 state안에
  //     reader.readAsDataURL(image);
  //     reader.onload = (event) => resolve(event.target.result);
  //     reader.onerror = (error) => reject(error);
  //   });
  // };

  // FileList의 타입인 files의 state가 바뀔 때마다
  // encodeFileToBase64로 files를 인코딩한 값을 Base64에 넣음
  // 파일 객체와 Base64 객체 모두 가지고 있음
  // useEffect(() => {
  //   if (files) {
  //     // state 초기화를 시켜주어야 함
  //     setBase64s([]);
  //     Array.from(files).forEach((image) => {
  //       if(fileValidation(image)){
  //       encodeFileToBase64(image).then((data) =>
  //         setBase64s((prev) => [...prev, { image: image, url: data }])
  //       );
  //       }
  //     });
  //   }
  //   console.log('files', files);
  //   console.log('base64s', base64s);

  // }, [files]);

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
            ref={titleRef}
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
              ref={imageRef}
              onChange={onChangePic}
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
          <textarea
            className="write-content"
            placeholder="오늘은 무슨 일이 있었나요?"
            onChange={onChangeInput}
            required
            ref={contentRef}
          />
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
