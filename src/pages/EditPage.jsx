import { useState, useRef, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import { Button, Form, InputGroup, Image } from 'react-bootstrap';
import { BsFillBackspaceFill } from 'react-icons/bs';
import { putDetailThunk } from '../features/writeSlice';
import './css/writepage.css';

const EditPage = () => {
  const post = useSelector((state) => state.detail.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 기존에 가지고 있는 이미지
  const images = post?.images;
  const imageKeys = Object.keys(post?.images);
  // const [imageKeys, setImageKeys] = useState(Object?.keys(post?.images))
  // const imageValues = Object.values(post?.images);
  const [imageValues, setImageValues] = useState(Object.values(post?.images));

  // formdata
  let formData = new FormData();
  // text data
  const [formDataTxt, setFormDataTxt] = useState();
  // input validation check
  const [validated, setValidated] = useState(false);
  // refs
  const titleRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();
  // image states
  const [files, setFiles] = useState([]); // files
  const [base64s, setBase64s] = useState([]); // base64s
  // delete image states
  const [deleteImgTray, setDeleteImgTray] = useState([]);
  // const previewImages = useSelector((state) => state.write.images);

  // 첨부 파일 검증
  const fileValidation = (obj) => {
    const fileTypes = ['image/jpeg', 'image/png'];
    let objExactType = obj.name.substring(obj.name.lastIndexOf('.') + 1);
    // console.log('objExactType', objExactType);
    const fileTypesName = [
      'jpeg',
      'jpg',
      'png',
      'bmp',
      'JPG',
      'JPEG',
      'PNG',
      'BMP',
    ];
    if (obj.name.length > 100) {
      alert('파일명이 100자 이상인 파일은 첨부할 수 없습니다.');
      imageRef.current.value = '';
      return false;
    } else if (obj.size > 10 * 1024 * 1024) {
      alert('용량이 10MB를 초과한 파일은 첨부할 수 없습니다.');
      imageRef.current.value = '';
      return false;
    } else if (obj.name.lastIndexOf('.') === -1) {
      alert('확장자가 없는 파일은 첨부할 수 없습니다.');
      imageRef.current.value = '';
      return false;
    } else if (!fileTypes.includes(obj.type)) {
      alert('해당 파일은 첨부할 수 없습니다.');
      imageRef.current.value = '';
      return false;
    } else if (!fileTypesName.includes(objExactType)) {
      alert('해당 파일은 첨부할 수 없습니다.');
      imageRef.current.value = '';
      return false;
    } else if (imageKeys.length + files.length - deleteImgTray.length > 5) {
      imageRef.current.value = '';
      alert('사진은 총 5장까지 게시할 수 있습니다.');
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
      setFormDataTxt({
        title: titleRef.current.value,
        images: base64s,
        content: contentRef.current.value,
      });
      setValidated(true);
    }
  };

  const deleteImage = (clickedImg) => {
    const dataTranster = new DataTransfer();
    Array.from(files)
      .filter((file) => file !== clickedImg)
      .forEach((file) => {
        dataTranster.items.add(file);
      });
    setFiles(dataTranster.files);
    imageRef.current.files = dataTranster.files;
  };

  const deleteExistingImage = (clickedImgValue) => {
    if (window.confirm('정말로 삭제하시겠어요?')) {
      for (let i = 0; i < imageKeys?.length; i++) {
        if (images[imageKeys[i]] === clickedImgValue) {
          setDeleteImgTray([...deleteImgTray, imageKeys[i]]);
        }
      }

      let newArr = Array.from(imageValues).filter(
        (image) => image !== clickedImgValue
      );

      setImageValues(newArr);
    }
  };

  const onChangePic = (e) => {
    setFiles(e.target.files);
  };

  // 파일이 변경될 때 마다 아래와 같이 새로 불러들이게 되며 리렌더링 진행
  useEffect(() => {
    if (files) {
      setBase64s([]);
      if (files.length <= 5) {
        for (var i = 0; i < files.length; i++) {
          // console.log(files[i].name);
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
      } else {
        imageRef.current.value = '';
        alert('사진 첨부는 5장까지 가능합니다.');
      }
    }
  }, [files]);

  useEffect(() => {
    if (formDataTxt !== undefined) {
      formData.append('title', titleRef.current.value);
      formData.append('content', contentRef.current.value);
      Array.from(files).forEach((file) => {
        formData.append('imageFiles', file);
      });
      // 추가
      // console.log('폼데이터 추가 직전 딜리트 트레이', deleteImgTray);
      formData.append('imagesToDelete', deleteImgTray);

      // FormData의 key 확인
      // for (let key of formData.keys()) {
      //   // console.log('폼데이터 키', key);
      // }

      // FormData의 value 확인
      // for (let value of formData.values()) {
      //   console.log('폼데이터 밸류', value);
      // }

      dispatch(putDetailThunk({ postId: post.postId, payload: formData }));
    }
  }, [formDataTxt]);

  return (
    <Container fluid className="write-wrap">
      <Form validated={validated} onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label className="subtitle">제목 😎</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="오늘의 요약!"
            autoFocus
            ref={titleRef}
            defaultValue={post?.title}
          />
          <Form.Control.Feedback type="invalid">
            일기 주제를 적어주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <div className="subtitle pre-img">기존 이미지 📌</div>
        <div className="write-preview-wrap">
          {images &&
            imageValues.map((image, idx) => {
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
                        () => deleteExistingImage(imageValues[idx])
                      }
                    />
                  </div>
                </Fragment>
              );
            })}
        </div>
        <br />
        <Form.Group>
          <Form.Label className="subtitle">오늘의 포토제닉 📸</Form.Label>
          <InputGroup>
            <Form.Control
              type="file"
              accept="image/gif, image/jpeg, image/png"
              multiple
              ref={imageRef}
              onChange={onChangePic}
            />
          </InputGroup>
          <div className="write-file-alert">
            파일 확장자 명은 jpg, jpeg, png, bmp 파일만 가능합니다. (파일 당
            10MB, 최대 5장)
          </div>
        </Form.Group>
        <br />

        <div className="write-preview-wrap">
          {base64s &&
            base64s.map((image, idx) => {
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
          <Form.Label className="subtitle">일기 본문 🎠</Form.Label>
          <Form.Control
            className="write-content"
            type="text"
            as="textarea"
            placeholder="오늘의 근황을 친구에게 공유해봅시다."
            required
            ref={contentRef}
            defaultValue={post?.content}
          />
          <Form.Control.Feedback type="invalid">
            일기내용을 적어주세요.
          </Form.Control.Feedback>
        </Form.Group>
        <br />
        <Button
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          뒤로 가기
        </Button>
        <Button type="submit" className="submitBtn">
          등록
        </Button>
      </Form>
    </Container>
  );
};

export default EditPage;
