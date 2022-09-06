import React, { useState, useRef, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import "./css/writepage.css";
import { saveImages } from "../features/writeSlice";
import { Image } from "react-bootstrap";
import { BsFillBackspaceFill } from "react-icons/bs";
import { postJsonDetailThunk } from "../features/writeSlice";


const WritePage = () => {
  const dispatch = useDispatch();
  // formdata
  let formData = new FormData();
  let formDataTxt = {};
  // text data
  // const [formDataTxt, setFormDataTxt] = useState();
  const nickname = "Sunny";
  // input validation check
  const [validated, setValidated] = useState(false);
  // refs
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  // image states
  const [files, setFiles] = useState([]);
  const [base64s, setBase64s] = useState([]);
  const previewImages = useSelector((state) => state.write.images);
  // 첨부 파일 검증
  const fileValidation = (obj) => {
    const fileTypes = ["image/gif", "image/jpeg", "image/png"];
    if (obj.name.length > 100) {
      alert("파일명이 100자 이상인 파일은 등록할 수 없습니다.");
      imageRef.current.value = "";
      return false;
    } else if (obj.size > 30 * 1024 * 1024) {
      alert("최대 파일 용량인 30MB를 초과한 파일은 등록할 수 없습니다.");
      imageRef.current.value = "";
      return false;
    } else if (obj.name.lastIndexOf(".") == -1) {
      alert("확장자가 없는 파일은 등록할 수 없습니다.");
      imageRef.current.value = "";
      return false;
    } else if (!fileTypes.includes(obj.type)) {
      alert("첨부가 불가능한 파일은 등록할 수 없습니다.");
      imageRef.current.value = "";
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
      formDataTxt = {
        id : new Date(),
        postId : Math.round((Math.random() * 99) + 1),
        nickname,
        title : titleRef.current.value,
        // images : imageRef.current.files,
        images : base64s,
        content : contentRef.current.value,
        date : new Date()
      }
      console.log(formDataTxt);
      setValidated(true);
    }
  };

  const deleteImage = (clickedImg) => {
    const dataTranster = new DataTransfer();
    // console.log('clickedImg', clickedImg);
    Array.from(files)
      .filter((file) => file !== clickedImg)
      .forEach((file) => {
        dataTranster.items.add(file);
      });
    setFiles(dataTranster.files);
    imageRef.current.files = dataTranster.files;
  };

  const onChangePic = (e) => {
    setFiles(e.target.files);
  };

  useEffect(() => {
    dispatch(saveImages(base64s));
    // console.log("files", files);
    // console.log("base64s", base64s);
    // console.log(previewImages);
  }, [onChangePic]);

  // 파일이 변경될 때 마다 아래와 같이, 새로 불러들이게 되며
  // 리렌더링이 진행
  useEffect(() => {
    if (files) {
      setBase64s([]);
      for (var i = 0; i < files.length; i++) {
        if (fileValidation(files[i])) {
          const reader = new FileReader();
          reader.readAsDataURL(files[i]);
          reader.onload = () => {
            if (reader.readyState === 2) {
              setBase64s((prev) => [...prev, reader.result]);
            }
          };
        }
      }
    }
  }, [files]);

  useEffect(() => {
    if(formData!==(null||undefined)){
    dispatch(postJsonDetailThunk({formDataTxt}));
    }
  }, []);

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
        <div className="write-preview-wrap">
          {previewImages &&
            previewImages.map((image, idx) => {
              return (
                <Fragment key={idx}>
                  <Image
                    thumbnail
                    rounded
                    className="write-preview-image"
                    src={image}
                  />
                  <div className="write-preview-btn">
                    <BsFillBackspaceFill
                      onClick={
                        // ()=>console.log((Object.entries(files))[idx][2])
                        () => deleteImage(files[idx])
                      }
                    />
                  </div>
                </Fragment>
              );
            })}
        </div>
        <br />
        <Form.Group>
          <Form.Label>일기내용</Form.Label>
          <Form.Control
            className="write-content"
            type="text"
            as="textarea"
            placeholder="오늘은 무슨 일이 있었나요?"
            required
            ref={contentRef}
            // hidden
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
