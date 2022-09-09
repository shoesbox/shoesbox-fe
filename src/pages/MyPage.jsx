import './css/mypage.css';
import { useEffect, useRef } from 'react';
import { getCookie } from '../shared/cookie';
import { apis } from '../api';
import { useState } from 'react';
import ModalProfileUpdate from '../components/ModalProfileUpdate';
import { Button, Form, InputGroup } from 'react-bootstrap';

const MyPage = ({ memberId }) => {
  // const memberId = getCookie('memberId');

  const [state, setState] = useState({
    email: '',
    nickname: '',
    profileImageUrl: '',
    selfDescription: '',
  });

  const nicknameRef = useRef();

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

  useEffect(() => {
    showData();
  }, [memberId]);
  // 이거 안해두면 다른 페이지 갔다가 여기 올 때마다 데이터 통신하는 거 맞죠?

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  // const [localContent, setLocalContent] = useState(user.nickname);
  // console.log('origin nickname', localContent);
  // const localContentInput = useRef();

  const handleEdit = () => {
    // 닉네임 설정 유효성 검사
    // if (localContent.length < 3) {
    //   localContentInput.current.focus();
    //   return;
    // }

    // 회원정보 수정 후 업뎃 api
    apis
      .updateUserData(memberId, { withCredentials: true })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    // onEdit(id, localContent);
    toggleIsEdit();
  };

  return (
    <div className="mypage">
      <div className="profile-box">
        <div className="image-profile">
          <img
            // src="https://velog.velcdn.com/images/hyexjun/profile/108c8f1a-b604-4881-9906-00270be78272/image.jpg"
            src={state.profileImageUrl}
            alt="프로필 사진"
          />
          <button onClick={handleShow}>이미지 업로드</button>
          <button>이미지 제거</button>
          <ModalProfileUpdate
            show={show}
            onHide={handleClose}
            // backdrop="static"
            keyboard={false}
          />
        </div>
        <div className="text-profile">
          <div>
            {isEdit ? (
              <Form.Control
                ref={nicknameRef}
                placeholder={state.nickname}
                // onChange={onChangeCommentStatus}
              />
            ) : (
              <p>{state.nickname}</p>
            )}
          </div>
          <p>{state.email}</p>
          <div className="nickname-edit">
            {!isEdit ? (
              <p onClick={toggleIsEdit}>수정</p>
            ) : (
              <>
                <p onClick={() => {}}>저장</p>
                <p onClick={toggleIsEdit}>취소</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="leave-box">
        <div>
          <p>회원 탈퇴</p>
          <button>회원 탈퇴</button>
        </div>
        <p>
          탈퇴 시 작성하신 포스트 및 댓글이 모두 삭제되며 복구되지 않습니다.
        </p>
      </div>
    </div>
  );
};

export default MyPage;
