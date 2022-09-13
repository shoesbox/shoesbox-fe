import './css/modaladdfriend.css';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRef } from 'react';
import { apis } from '../api';

const ModalProfileUpdate = (props) => {
  // console.log(props);

  // 회원정보 - 프사 수정 로직
  const imgRef = useRef();
  const handleUpdateProfile = () => {
    const newProfile = imgRef.current.value;

    console.log(newProfile);
    const formData = new FormData();
    formData.append('imageFile', newProfile);

    apis
      .updateUserData(props.memberId, formData)
      .then((res) => {
        // console.log(res);
        props.setState({ ...props.state, profileImageUrl: newProfile });
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal className="detail-modal" {...props} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <div>프로필 사진 변경</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>새로운 사진을 업로드해주세요 🍩🍨</Form.Label>
          <Form.Control type="file" ref={imgRef} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button type="button" variant="primary" onClick={handleUpdateProfile}>
          등록
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProfileUpdate;
