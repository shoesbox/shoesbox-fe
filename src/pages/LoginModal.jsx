import { useRef, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './css/loginmodal.css';
// import apis from '../api/index';
// import { setCookie } from '../shared/Cookie';

const LoginModal = ({ login, handleCloseLogin }) => {
  const [signup, setSignup] = useState(false);

  const handleLogin = async (event) => {
    // event.preventDefault();
    // const res = await apis.loginUser(state, { withCredentials: true });
    // try {
    //   const token = res.data.data.token;
    //   setCookie('accessToken', token.accessToken, token.accessTokenExpiresIn);
    //   setCookie('refreshToken', token.refreshToken, token.accessTokenExpiresIn);
    //   setCookie('userId', res.data.data.id, token.accessTokenExpiresIn);
    //   setCookie('username', res.data.data.username, token.accessTokenExpiresIn);
    //   alert('로그인 성공');
    //   window.location.reload(true);
    // } catch (error) {
    //   alert(res.data.errorCode.message);
    //   console.log(error);
    // }
  };

  return (
    <>
      <Modal show={login} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>{!signup ? '로그인' : '회원가입'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <br />
          <div className="social">
            <button className="social__button social__button--naver"></button>
            <button className="social__button social__button--kakao"></button>
            <button className="social__button social__button--google"></button>
          </div>
          <br />
          <span>
            {!signup ? '아직 회원이 아니신가요?' : '계정이 이미 있으신가요?'}
          </span>
          <span className="change-login" onClick={() => setSignup(!signup)}>
            {!signup ? ' 회원가입' : ' 로그인'}
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          {!signup ? (
            <Button variant="primary" onClick={handleLogin}>
              Log In
            </Button>
          ) : (
            <Button variant="primary" onClick={handleLogin}>
              Sign Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
