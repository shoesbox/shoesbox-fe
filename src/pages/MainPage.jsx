import "./css/mainpage.css";
import { useState, useEffect, useRef } from "react";
import Calendar from "../components/Calendar";
import { Calender2 } from "../components/Calendar2";
import WriteFixedBtn from "../components/WriteFixedBtn";
import FriendsList from "../components/FriendsList";
import { getCookie, setCookie, cookies } from "../shared/cookie";
import { apis } from "../api";
import { useSelector } from "react-redux";
import { useLocation, redirect, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const MainPage = () => {
  const cookie = getCookie("refreshToken");
  // const standard = getCookie('standard');
  let standard = window.sessionStorage.getItem("standard");
  const location = useLocation();
  let loading = new URL(window.location.href).searchParams.get("loading");
  // console.log(loading);
  const navigate = useNavigate();
  const infos = useRef(location.state);
  // const userInfos = useRef(useSelector((state) => state?.calender?.userInfo));
  const [isLoggedIn, setisLoggedIn] = useState(false);
  // let code = new URL(window.location.href).searchParams.get('code');
  // console.log('code', code);
  // useEffect(() => {
  //  fetchUser();
  // }, []);

  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedIn(true);
    } else {
      setisLoggedIn(false);
    }
  }, [cookie]);

  useEffect(() => {
    if (infos.current !== null) {
      console.log(infos);
      window.sessionStorage.setItem("standard", "true");
      setCookie(
        "accessToken",
        infos.current.accessToken,
        infos.current.accessTokenExpireDate
      );
      setCookie(
        "refreshToken",
        infos.current.refreshToken,
        infos.current.refreshTokenExpireDate
      );
      setCookie("memberId", infos.current.memberId);
      setCookie("email", infos.current.email);
      setCookie("nickname", infos.current.nickname);

      setTimeout(() => {
        window.location.replace("/?loading=true");
        if (cookie.length > 0 && standard === "true") {
          window.sessionStorage.setItem("standard", "false");
          window.location.replace("/?loading=false");
          navigate(location.pathname, {});
        }
      }, 50);
    }
  }, [infos]);

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
  const memberId = getCookie("memberId");
  const nickname = getCookie("nickname");
  const [calMemberId, setCalMemberId] = useState(memberId); // 로그인 유저 초기값
  const [calMemberNickname, setCalMemberNickname] = useState(nickname); // 로그인 유저 초기값

  return (
    <>
      {loading === "true" ? (
        <Spinner animation="border" />
      ) : isLoggedIn ? (
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
