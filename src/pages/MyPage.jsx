import './css/mypage.css';
import { useState, useEffect, useRef } from 'react';
import { getCookie, deleteCookie } from '../shared/cookie';
import { apis } from '../api';
import ModalProfileUpdate from '../components/ModalProfileUpdate';
import { Form } from 'react-bootstrap';

const MyPage = ({ memberId }) => {
  // 여기서 멤버아이디 끌어다 쓰기랑 프롭으로 내려주기랑 차이?
  // const MyPage = () => {
  //   const memberId = getCookie('memberId');

  // 통신해서 가져온 데이터 담아서 사용할 state
  const [state, setState] = useState({
    email: '',
    nickname: '',
    profileImageUrl: '',
  });

  // 친구 목록 담을 state
  const [friends, setFriends] = useState([]);

  // 회원정보조회 api 통해 데이터 가져오기 [2]
  const showData = async () => {
    const { data } = await apis.getUserData(memberId, {
      withCredentials: true,
    });
    try {
      const userData = data?.data;
      // console.log('userData', userData);
      setState(userData);
    } catch (err) {
      console.log(err);
    }
  };

  // 친구 조회 api로 데이터 가져오기 [3]
  const showFriends = async () => {
    const raw = await apis.getFriendList();
    const friendsList = raw.data.data;
    setFriends(friendsList);
  };

  // // 화면 렌더링 시 통신하기 [1]
  useEffect(() => {
    showData();
    showFriends();
  }, [state.profileImageUrl]);

  // 이미지 업로드 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // 이미지 제거 함수
  const deleteProfileImg = () => {
    apis
      .resetProfileImg()
      .then((res) => {
        // console.log(res);
        setState({
          ...state,
          profileImageUrl: 'https://i.ibb.co/N27FwdP/image.png',
        });
      })
      .catch((err) => console.log(err));
  };

  // 닉네임 수정/저장취소 토글 버튼
  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // 닉네임 input 값 가져올때 ref vs state
  const handleChangeState = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // 회원정보 - 닉네임 수정 로직
  const nicknameRef = useRef();
  const handleNicknameEdit = () => {
    const newNickname = nicknameRef.current.value;
    // 닉네임 설정 유효성 검사
    if (newNickname.length < 2 || newNickname.length > 6) {
      alert('닉네임은 두 글자 이상 여섯 글자 이하여야 합니다.');
      nicknameRef.current.focus();
      return;
    }
    const formData = new FormData();
    formData.append('nickname', newNickname);
    apis
      .updateUserData(memberId, formData)
      .then((res) => {
        // console.log(res);
        setState({ ...state, nickname: newNickname });
        toggleIsEdit();
      })
      .catch((err) => console.log(err));
  };

  // 친구삭제 로직
  const handleRemoveFriend = (deleteMemberId, nickname) => {
    let result = window.confirm(`정말로 ${nickname}님을 삭제하시겠어요?`);
    if (result === true) {
      apis.deleteFriend(deleteMemberId);

      const newFriendsList = friends.filter(
        (friend) => friend.memberId !== deleteMemberId
      );
      setFriends(newFriendsList);
    }
  };

  // 회원탈퇴 로직
  const handleRemoveAccout = (e) => {
    e.preventDefault();
    // console.log(memberId);
    let result = window.confirm('정말로 슈슈박스를 떠나시겠어요? T_T');
    if (result === true) {
      console.log(memberId);
      apis
        .removeAccount(memberId)
        .then((res) => {
          // console.log(res);
          alert('회원 탈퇴가 완료되었습니다.');
          // 회원탈퇴 후 쿠키도 날려주기
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          deleteCookie('memberId');
          deleteCookie('nickname');
          deleteCookie('email');
          window.location.replace('/');
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="mypage">
      <div className="profile-box">
        <div className="image-profile">
          <img src={state.profileImageUrl} alt="프로필 사진" />
          <button onClick={handleShow}>이미지 업로드</button>
          <button onClick={deleteProfileImg}>이미지 제거</button>
          <ModalProfileUpdate
            show={show}
            onHide={handleClose}
            backdrop="static"
            memberId={memberId}
            state={state}
            setState={setState}
          />
        </div>
        <div className="text-profile">
          <div>
            {isEdit ? (
              <Form.Control
                ref={nicknameRef}
                placeholder={state.nickname}
                // state로 input 값 가져다 쓸 때 용
                // name="nickname"
                // value={state.nickname}
                // onChange={handleChangeState}
              />
            ) : (
              <p>{state.nickname}</p>
            )}
          </div>
          <p>{state.email}</p>
          <div className="nickname-edit">
            {!isEdit ? (
              <div onClick={toggleIsEdit}>수정</div>
            ) : (
              <>
                <div onClick={handleNicknameEdit}>저장</div>
                <div onClick={toggleIsEdit}>취소</div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="friends-box">
        <p>친구 끊기 ⛔</p>
        <p>친구의 이름을 클릭하면 목록에서 삭제됩니다.</p>
        <div className="friends-list">
          {friends.map((friend) => (
            <div
              key={friend.memberId}
              onClick={() =>
                handleRemoveFriend(friend.memberId, friend.memberNickname)
              }
            >
              {friend.memberNickname}
            </div>
          ))}
        </div>
      </div>
      <div className="leave-box">
        <p>회원 탈퇴 😢</p>
        <p>탈퇴 시 작성하신 일기 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
        <button onClick={handleRemoveAccout}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default MyPage;
