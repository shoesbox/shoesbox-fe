import './css/modaladdfriend.css';
import { Button, Form, Modal } from 'react-bootstrap';

const ModalProfileUpdate = (props) => {
  // console.log(props);
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
          <Form.Control type="file" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button type="submit" variant="primary">
          등록
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalProfileUpdate;
