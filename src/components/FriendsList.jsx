import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { BsPlusLg } from "react-icons/bs";
import ModalAddFriend from "./ModalAddFriend";
// import { getCookie } from '../shared/Cookie';
import { getFriendListThunk } from "../features/friendSlice";
import "./css/friendslist.css";

const FriendsList = () => {
  // const cookie = getCookie('accessToken');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friend.friendList);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  console.log("friendList", friendList);
  // useEffect(() => {
  //   if (cookie !== undefined) {
  //     return setIsLoggedIn(true);
  //   }
  // }, []);

  useEffect(() => {
    dispatch(getFriendListThunk());
  }, []);

  return (
    <>
      <div className="friends">
        {friendList?.length > 0 ? (
          friendList.map((friend, idx) => {
            return <Button key={idx}>{friend.fromMemberNickname}</Button>;
          })
        ) : (
          <></>
        )}
        <Button onClick={handleShow}>
          <BsPlusLg />
        </Button>
      </div>
      <ModalAddFriend
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      />
    </>
  );
};

export default FriendsList;
