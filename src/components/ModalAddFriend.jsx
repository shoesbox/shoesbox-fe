import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import { BsPersonPlusFill, BsSearch } from 'react-icons/bs';
import {
  addFriendThunk,
  getRequestFriendListThunk,
  acceptFriendThunk,
  refuseFriendThunk,
} from '../features/friendSlice';
import './css/modaladdfriend.css';

const ModalAddFriend = (props) => {
  const dispatch = useDispatch();
  const requestFriendList = useSelector(
    (state) => state.friend.requestFriendList
  );
  const addFriendRef = useRef();

  const validateEmail = (email) => {
    // 주어온 strict 한 정규식
    // 현재는 테스트로 조건 걸어 놓지 않음
    // var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    var emailReg = new RegExp();
    return emailReg.test(email);
  };
  const onClickAddFriend = () => {
    if (addFriendRef.current.value.trim() !== '') {
      if (validateEmail(addFriendRef.current.value)) {
        //  console.log(addFriendRef.current.value);
        const email = addFriendRef.current.value;
        dispatch(addFriendThunk(email));
      } else {
        alert('이메일 형식을 확인해주세요.');
      }
    } else {
      alert('추가하실 친구의 이메일을 입력해주세요.');
    }
  };

  const onClickAccept = (memberId) => {
    dispatch(acceptFriendThunk(memberId));
  };

  const onClickRefuse = (memberId) => {
    dispatch(refuseFriendThunk(memberId));
  };

  const onEnterdown = (e) => {
    if (e.key === 'Enter') {
      onClickAddFriend();
    }
  };

  const RequestFriendList = () => {
    return (
      <>
        {requestFriendList.length === 0 ? (
          <div>현재 요청된 사항이 없습니다.</div>
        ) : (
          requestFriendList.map((member, idx) => (
            <div key={idx} className="addfriend-list">
              <div>
                <span>{member.memberNickname}</span>
                님이 친구 맺기를 요청하였습니다.
              </div>
              <div>
                <Button onClick={() => onClickAccept(member.memberNickname)}>
                  O
                </Button>
                <Button onClick={() => onClickRefuse(member.memberNickname)}>
                  X
                </Button>
              </div>
            </div>
          ))
        )}
      </>
    );
  };

  useEffect(() => {
    dispatch(getRequestFriendListThunk());
    // console.log(requestFriendList);
  }, []);

  return (
    <Modal
      className="detail-modal"
      {...props}
      centered
      size="md"
      fullscreen="sm-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div>친구 신청</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup>
          <InputGroup.Text className="addfriend-friend-icon">
            <BsPersonPlusFill />
          </InputGroup.Text>
          <Form.Control
            type="email"
            ref={addFriendRef}
            placeholder="친구의 이메일 주소를 입력해주세요 :)"
            onKeyDown={(e) => onEnterdown(e)}
          />
          <InputGroup.Text
            className="addfriend-search-icon"
            type="button"
            onClick={onClickAddFriend}
          >
            <BsSearch />
          </InputGroup.Text>
        </InputGroup>
        <br />
        <RequestFriendList />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddFriend;
