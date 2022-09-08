import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { BsPersonPlusFill, BsSearch } from "react-icons/bs";
import {
  addFriendThunk,
  getRequestFriendListThunk,
  acceptFriendThunk
} from "../features/friendSlice";
import "./css/modaladdfriend.css";

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
    if (addFriendRef.current.value.trim() !== "") {
      if (validateEmail(addFriendRef.current.value)) {
        //  console.log(addFriendRef.current.value);
        // setEmail(addFriendRef.current.value);
        const email = addFriendRef.current.value;
        dispatch(addFriendThunk(email))
      } else {
        alert("이메일 형식을 확인해주세요");
      }
    } else {
      alert("추가하실 친구 이메일을 입력해주세요");
    }
  };

  const onClickAccept = (fromMemberId) =>{
    // alert(`수락, fromMemberId:${fromMemberId}`);
    dispatch(acceptFriendThunk(fromMemberId));
  }

  const onEnterdown = (e) =>{
   if(e.key ==='Enter'){
    onClickAddFriend();
   }
  }

  const RequestFriendList = () => {
    return (
      <div className="addfriend-list">
        {requestFriendList.map((member, idx) => (
          <div key={idx}>
            <span>{member.fromMemberNickname}님이 친구 신청을 하였습니다.</span>
            &nbsp; &nbsp;
            <Button onClick={()=>onClickAccept(member.fromMemberId)}>O</Button> <Button>X</Button>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    dispatch(getRequestFriendListThunk());
    // console.log(requestFriendList);
  }, []);

  // useEffect(() => {
  //   dispatch(addFriendThunk(email));
  // }, [email]);

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
          <div>친구 추가</div>
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
            placeholder="친구 이메일 입력"
            onKeyDown={(e)=>onEnterdown(e)}
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
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ModalAddFriend;
