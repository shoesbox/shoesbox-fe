import './css/friendslist.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import ModalAddFriend from './ModalAddFriend';
import { getFriendListThunk, delFriendThunk } from '../features/friendSlice';

const FriendsList = () => {
  const dispatch = useDispatch();
  const friendList = useSelector((state) => state.friend.friendList);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  console.log('friendList', friendList);

  useEffect(() => {
    dispatch(getFriendListThunk());
  }, []);

  // 임시적으로, 해당 친구의 버튼을 클릭하면, 해당 친구가 삭제 됩니다.
  const onClickDelFriend = (memberId) => {
    dispatch(delFriendThunk(memberId));
  };
  return (
    <>
      <div className="friends">
        {friendList?.length > 0
          ? friendList.map((friend, idx) => {
              return (
                <Button
                  key={idx}
                  onClick={() => onClickDelFriend(friend.memberId)}
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
