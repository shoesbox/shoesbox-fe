import './css/mypage.css';
import { useState, useEffect, useRef } from 'react';
import { getCookie, deleteCookie } from '../shared/cookie';
import { apis } from '../api';
import ModalProfileUpdate from '../components/ModalProfileUpdate';
import { Button, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';

const MyPage = ({ memberId }) => {
  // const memberId = getCookie('memberId');
  // 여기서 멤버아이디 끌어다 쓰기랑 프롭으로 내려주기랑 차이?

  // 통신해서 가져온 데이터 담아서 사용할 state
  const [state, setState] = useState({
    email: '',
    nickname: '',
    profileImageUrl: '',
    selfDescription: '',
  });

  // 회원정보조회 api 통해 데이터 가져오기 [2]
  const showData = async () => {
    const { data } = await apis.getUserData(memberId, {
      withCredentials: true,
    });
    try {
      const userData = data?.data;
      console.log('userData', userData);
      setState(userData);
    } catch (err) {
      console.log(err);
    }
  };

  // 화면 렌더링 시 통신하기 [1]
  useEffect(() => {
    showData();
  }, []);

  // 이미지 업로드 모달
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // 이미지 제거 함수
  const deleteProfileImg = () => {
    apis
      .updateUserData(
        memberId,
        {
          nickname: state.nickname,
          profileImageUrl: 'https://i.ibb.co/N27FwdP/image.png',
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        toggleIsEdit();
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
  const handleNicknameEdit = (event) => {
    const newNickname = nicknameRef.current.value;
    // 닉네임 설정 유효성 검사
    if (newNickname.length < 3) {
      alert('닉네임은 3자 이상으로 수정해주세요.');
      nicknameRef.current.focus();
      return;
    }

    // setState({ ...state, nickname: newNickname });
    // console.log(state);

    const newData = {
      nickname: newNickname,
      // imageFile: state.profileImageUrl,
      // selfDescription: null,
    };

    console.log(newData);

    apis
      .updateUserData(memberId, newData)
      .then((res) => {
        console.log(res);
        toggleIsEdit();
      })
      .catch((err) => console.log(err));
  };

  // 회원정보 - 프사 수정 로직
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('사진 업뎃');
  };

  // 회원탈퇴 로직
  const handleRemoveAccout = (e) => {
    e.preventDefault();
    // console.log(memberId);
    let result = window.confirm('정말로 탈퇴하시겠습니까?');
    if (result === true) {
      console.log(memberId);
      apis
        .removeAccount(memberId)
        .then((res) => {
          console.log(res);
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
            // backdrop="static"
            keyboard={false}
            // onSubmit={handleUpdateProfile}
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
      <div className="leave-box">
        <div>
          <p>회원 탈퇴</p>
          <button onClick={handleRemoveAccout}>회원 탈퇴</button>
        </div>
        <p>탈퇴 시 작성하신 일기 및 댓글이 모두 삭제되며 복구되지 않습니다.</p>
      </div>
    </div>
  );
};

export default MyPage;
