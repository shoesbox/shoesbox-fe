import { getCookie } from '../shared/cookie';
import './css/mypage.css';

const MyPage = () => {
  const username = getCookie('username');
  return (
      <div className="mypage">
        <div className="setting-top">
          <div className="setting-profile">
            <img
              src="https://velog.velcdn.com/images/hyexjun/profile/108c8f1a-b604-4881-9906-00270be78272/image.jpg"
              alt="프로필 사진"
            />
            <button>이미지 업로드</button>
            <button>이미지 제거</button>
          </div>
          <div className="setting-profile2">
            <p>{username}</p>
            <p>{username}@gmail.com</p>
            <p>수정</p>
          </div>
        </div>
        <div className="setting-body1">
          <div>
            <p>벨로그 제목</p>
            <p>{username}.Devlog</p>
            <p>수정</p>
          </div>
          <p>개인 페이지 좌측 상단에 나타나는 페이지 제목입니다.</p>
        </div>
        <div className="setting-body1">
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
