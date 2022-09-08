import './css/friendslist.css';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { BsPlusLg } from 'react-icons/bs';
import ModalAddFriend from '../components/ModalAddFriend';

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

  // 임시적으로, 해당 친구의 버튼을 클릭하면, 해당 친구가 삭제 됩니다.
  const onClickDelFriend = (fromMemberId) => {
    dispatch(delFriendThunk(fromMemberId));
  };
  return (
    <>
      <div className="friends">
        {friendList?.length > 0 ? (
          friendList.map((friend, idx) => {
            return (
              <Button
                key={idx}
                onClick={() => onClickDelFriend(friend.fromMemberId)}
              >
                {friend.fromMemberNickname}
              </Button>
            );
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
