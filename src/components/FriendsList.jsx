import './css/friendslist.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import ModalAddFriend from './ModalAddFriend';
import { getFriendListThunk, delFriendThunk } from '../features/friendSlice';

const FriendsList = ({ friendList, setCalMemberId }) => {
  const dispatch = useDispatch();
  // const friendList = useSelector((state) => state.friend.friendList);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getFriendListThunk());
  }, []);

  const changeCalMemberId = (memberId) => {
    setCalMemberId(memberId);
  };

  return (
    <>
      <div className="friends">
        {friendList?.length > 0
          ? friendList.map((friend, idx) => {
              return (
                <Button
                  key={idx}
                  onClick={() => changeCalMemberId(friend.memberId)}
                >
                  <span>{friend.memberNickname}</span>
                </Button>
              );
            })
          : null}
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
