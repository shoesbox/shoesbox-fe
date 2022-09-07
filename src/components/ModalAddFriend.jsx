import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsPersonPlusFill, BsSearch } from 'react-icons/bs';
import {getRequestFriendListThunk} from '../features/friendSlice';
import './css/modaladdfriend.css';

const ModalAddFriend = (props) => {
  const dispatch = useDispatch();
  const requestFriendList = useSelector((state)=> state.friend.requestFriendList)
  const RequestFriendList = () => {
    return (
      <div className="addfriend-list">
        {requestFriendList.map((member, idx) => (
          <div key={idx}>
            <span>{member.fromMemberNickname}님이 친구 신청을 하였습니다.</span>
            &nbsp; &nbsp;
            <Button>O</Button> <Button>X</Button>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
  dispatch(getRequestFriendListThunk())
  console.log(requestFriendList);
  
    }, [])
  

  return (
    <Modal className="detail-modal" {...props} centered size="md" fullscreen="sm-down">
      <Modal.Header closeButton>
        <Modal.Title>
          <div>친구 추가</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Text className="addfriend-friend-icon">
            <BsPersonPlusFill />
          </InputGroup.Text>
          <Form.Control placeholder="친구 이메일 입력" />
          <InputGroup.Text className="addfriend-search-icon">
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>
        <br />
        <RequestFriendList />
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalAddFriend;
