import './css/mainpage.css';
import { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import { Calender2 } from '../components/Calendar2';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
import { getCookie } from '../shared/cookie';

const MainPage = () => {
  const cookie = getCookie('accessToken');
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  return (
    <>
      {isLoggedIn ? (
        <>
          <FriendsList />
          <div className="wrap">
            <Calendar />
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
