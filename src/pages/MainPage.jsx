import './css/mainpage.css';
import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { Calender2 } from '../components/Calendar2';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
import { getCookie } from '../shared/cookie';
import { apis } from '../api';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const cookie = getCookie('accessToken');
  const memberId = getCookie('memberId');

  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  // 그리는 달력 주인 state
  const [calMemberId, setCalMemberId] = useState(memberId);
  console.log('calMemberId', calMemberId);

  // 친구목록 리덕스에서 꺼내오든가
  const friendList = useSelector((state) => state.friend.friendList);
  console.log('friendList', friendList);

  // 친구 목록 담을 state
  const [friends, setFriends] = useState([]);
  // 친구 조회 api로 데이터 가져오기
  const showFriends = async () => {
    const raw = await apis.getFriendList();
    const friendsList = raw.data.data;
    setFriends(friendsList);
  };

  return (
    <>
      {isLoggedIn ? (
        <>
          <FriendsList
            friendList={friendList}
            setCalMemberId={setCalMemberId}
          />
          <div className="wrap">
            <Calendar calMemberId={calMemberId} />
          </div>

          {/* <div className="wrap2">
            <Calender2 />
          </div> */}

          {/* <WriteFixedBtn /> */}
        </>
      ) : (
        <div className="welcome">
          <p>You can use it after Log in ✨</p>
        </div>
      )}
    </>
  );
};

export default MainPage;
