import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import './css/modallogin.css';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';

const domain = 'http://localhost:3000';
const ec2 = 'http://shoesbox.today';
const firebase = 'https://shoesbox.web.app';

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=tuIptgGLMJX69dUPmYxk&redirect_uri=${firebase}/oauth/callback/naver`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=beaf923464e502569ef542beeb8b039a&redirect_uri=${firebase}/oauth/callback/kakao&response_type=code`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=485224332964-qu4rqe2munogvisuphhuljf4mc6fliuh.apps.googleusercontent.com&response_type=code&redirect_uri=${firebase}/oauth/callback/google&scope=email%20profile`;

const ModalLogin = ({ login, handleCloseLogin }) => {
  const [state, setState] = useState({
    email: '',
    password: '',
    password1: '',
  });

  const handleChangeState = (event) => {
    // console.log(event.target.name);
    // console.log(event.target.value);
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const [signup, setSignup] = useState(false);

  const handleGuest = async () => {
    apis
      .guestUser()
      .then((res) => {
        // console.log('res', res);
        // console.log('res.data', res.data);
        const token = res.data.data;
        setCookie(
          'accessToken',
          token.accessToken,
          token.accessTokenExpireDate
        );
        setCookie(
          'refreshToken',
          token.refreshToken,
          token.refreshTokenExpireDate
        );
        setCookie('memberId', token.memberId);
        setCookie('email', token.email);
        setCookie('nickname', token.nickname);
        // alert('로그인 성공');
        window.location.reload(true);
      })
      .catch((err) => {
        // console.log(err);
        const errMessage = err.response?.data.errorDetails.apierror.message;
        // console.log(errMessage);
        alert(errMessage);
      });
  };

  const handleSocialGoogle = async (event) => {
    event.preventDefault();
    window.location.href = GOOGLE_AUTH_URL;
  };

  const handleSocialKakao = async (event) => {
    event.preventDefault();
    window.location.href = KAKAO_AUTH_URL;
  };

  const handleLoginNaver = async (event) => {
    event.preventDefault();
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <>
      <Modal show={login} onHide={handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>{!signup ? '로그인' : '회원가입'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="login-logo">
            <img src="images/logo.jpg" alt="웰컴 이미지" />
          </div>
          <br />
          <div className="social">
            <button
              className="social__button social__button--naver"
              onClick={handleLoginNaver}
            />
            <button
              className="social__button social__button--kakao"
              onClick={handleSocialKakao}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          <Button onClick={() => handleGuest()}>Guest</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalLogin;
