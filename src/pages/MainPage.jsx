import './css/mainpage.css';
import { useState, useEffect, useRef } from 'react';
import Calendar from '../components/Calendar';
import { Calender2 } from '../components/Calendar2';
import WriteFixedBtn from '../components/WriteFixedBtn';
import FriendsList from '../components/FriendsList';
import { getCookie, setCookie, cookies } from '../shared/cookie';
import { apis } from '../api';
import { useSelector } from 'react-redux';
import { useLocation, redirect, useNavigate } from 'react-router-dom';

const MainPage = () => {
  const cookie = getCookie('refreshToken');
  const location = useLocation();
  const navigate = useNavigate();
  let userInfo =  useRef(location.state);
  // let userInfos =  useRef(new URL(window.location.href).searchParams.get('token'));
  // let code = new URL(window.location.href).searchParams.get('code');
  // console.log('code', code);
  // const fetchUser = async () => {
  //   if (code?.length>0) {
  //     apis.loginGoogle(code)
  //     .then((res) => res.data?.data)
  //     .then((token) => {     
  //       console.log(token);
  //       let date = new Date();
  //       date.setTime(token.accessTokenExpireDate);  
  //       cookies.set('cookie', token.accessToken, { 
  //         path: 'http//localhost:3000',
  //         expires: date.toUTCString() }
  //       );
  //       setCookie(
  //         'accessToken',
  //         token.accessToken,
  //         token.accessTokenExpireDate
  //       );
  //       setCookie(
  //         'refreshToken',
  //         token.refreshToken,
  //         token.refreshTokenExpireDate
  //       );
  //       setCookie('memberId', token.memberId);
  //       setCookie('email', token.email);
  //       setCookie('nickname', token.nickname);
  //       // window.location.replace('/')
  //     })
  //   }
  // };



  // let userInfo2 = window.localStorage.setItem
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  useEffect(() => {
    // console.log('Main userInfo useEffect', userInfos);
  

    if(userInfo.current!==null){
      console.log('Main userInfo useEffect2', userInfo);
    // location.replace('/');
    // redirect('/');

    // setTimeout(() => {
  
    // }, 500);

    setCookie(
      'accessToken',
      userInfo.current.accessToken,
      userInfo.current.accessTokenExpireDate
    );
    setCookie(
      'refreshToken',
      userInfo.current.refreshToken,
      userInfo.current.refreshTokenExpireDate
    );
    setCookie('memberId', userInfo.current.memberId);
    setCookie('email', userInfo.current.email);
    setCookie('nickname', userInfo.current.nickname);

    setTimeout(() => {
      // location.replaceState('');
      // location.replace('/');
      // location.reload(true);
      // location.replaceState({}, null, location.pathname);
      // location.replaceState('');
      location.replace('/');
      redirect('/');
      // navigate(location.pathname, { replace: true });
      // navigate(location.pathname, {}); 
      // location.replace('/');
      // navigate(location.pathname, {}); 
    }, 1000);

    }


    return () =>{
      // userInfo.current = '';
      // useLocation.state ='';
      // location.replaceState({}, null, location.pathname);
      // location.replaceState('');
      // location.replace('/');
      // console.log(location.pathname)
      // redirect('/');
      // navigate(location.pathname, {}); 

    }

  }, [userInfo]);

  // useEffect(() => {
  //  fetchUser()
  // }, []);

  // 친구목록 리덕스에서 꺼내오든가
  const friendList = useSelector((state) => state.friend.friendList);
  // console.log('friendList', friendList);

  // // 친구 목록 담을 state
  // const [friends, setFriends] = useState([]);
  // // 친구 조회 api로 데이터 가져오기
  // const showFriends = async () => {
  //   const raw = await apis.getFriendList();
  //   const friendsList = raw.data.data;
  //   setFriends(friendsList);
  // };

  // 그리는 달력 주인 state
  const memberId = getCookie('memberId');
  const nickname = getCookie('nickname');
  const [calMemberId, setCalMemberId] = useState(memberId); // 로그인 유저 초기값
  const [calMemberNickname, setCalMemberNickname] = useState(nickname); // 로그인 유저 초기값

  return (
    <>
      {isLoggedIn ? (
        <>
          <FriendsList
            friendList={friendList}
            setCalMemberId={setCalMemberId}
            setCalMemberNickname={setCalMemberNickname}
          />
          <div className="wrap">
            <Calendar
              calMemberId={calMemberId}
              calMemberNickname={calMemberNickname}
            />
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
