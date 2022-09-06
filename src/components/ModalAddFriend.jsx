import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsPersonPlusFill, BsSearch } from 'react-icons/bs';
import './css/modaladdfriend.css';

const ModalAddFriend = (props) => {
  const addMemberList = ['등록자아', 'hello'];
  const AddMemberList = () => {
    return (
      <div className="addfriend-list">
        {addMemberList.map((member, idx) => (
          <div key={idx}>
            <span>{member}님이 친구 신청을 하였습니다.</span>
            &nbsp; &nbsp;
            <Button>O</Button> <Button>X</Button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Modal className="detail-modal" {...props} centered size="md">
      <Modal.Header closeButton>
        <Modal.Title>
          <span>
            <strong>친구추가</strong>
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Text className="addfriend-friend-icon">
            <BsPersonPlusFill />
          </InputGroup.Text>
          <Form.Control placeholder="친구 추가" />
          <InputGroup.Text className="addfriend-search-icon">
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>
        <br />
        <AddMemberList />
      </Modal.Body>
      {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
    </Modal>
  );
};

export default ModalAddFriend;
