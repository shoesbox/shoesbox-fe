import './css/friendslist.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { BsPlusLg, BsPersonPlus } from 'react-icons/bs';
import ModalAddFriend from './ModalAddFriend';
import { getFriendListThunk, delFriendThunk } from '../features/friendSlice';

const FriendsList = ({ friendList, setCalMemberId, setCalMemberNickname }) => {
  const dispatch = useDispatch();
  // const friendList = useSelector((state) => state.friend.friendList);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    dispatch(getFriendListThunk());
  }, []);

  const changeCalMember = (memberId, nickname) => {
    setCalMemberId(memberId);
    setCalMemberNickname(nickname);
  };

  return (
    <div className="freinds-wrap">
      <div className="friends">
        {friendList?.length > 0
          ? friendList.map((friend, idx) => {
              return (
                <Button
                  key={idx}
                  onClick={() =>
                    changeCalMember(friend.memberId, friend.memberNickname)
                  }
                >
                  <span>
                    {friend.memberNickname.length > 3
                      ? friend.memberNickname.slice(0, 3)
                      : friend.memberNickname}
                  </span>
                </Button>
              );
            })
          : null}
        <Button onClick={handleShow}>
          <span>
            <BsPersonPlus style={{ fontSize: '20px' }} />
          </span>
        </Button>
      </div>
      <ModalAddFriend show={show} onHide={handleClose} />
    </div>
  );
};

export default FriendsList;
