import { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import './css/modallogin.css';
import { apis } from '../api';
import { setCookie } from '../shared/cookie';

const domain = 'http://localhost:3000';
const firebase = 'https://shoesbox.web.app/';
const ec2 = 'http://shoesbox.today/';

const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=tuIptgGLMJX69dUPmYxk&redirect_uri=${ec2}/oauth/callback/naver`;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=beaf923464e502569ef542beeb8b039a&redirect_uri=${ec2}/oauth/callback/kakao&response_type=code`;
const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=485224332964-qu4rqe2munogvisuphhuljf4mc6fliuh.apps.googleusercontent.com&response_type=code&redirect_uri=${ec2}/oauth/callback/google&scope=email%20profile`;

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

  const handleLogin = async (event) => {
    event.preventDefault();

    if (state.email.trim() === '' || state.password.trim() === '') {
      return alert('입력항목은 공란일 수 없습니다.');
    }
    apis
      .loginUser(state, { withCredentials: true })
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

  const handleSignup = async (event) => {
    event.preventDefault();
    if (state.email.trim() === '' || state.password.trim() === '') {
      return alert('입력항목은 공란일 수 없습니다.');
    }
    if (state.password === state.password1) {
      apis
        .joinUser(state, { withCredentials: true })
        .then((res) => {
          alert('회원가입이 완료되었습니다.');
          window.location.reload(true);
        })
        .catch((err) => {
          // console.log(err.response.data.errorDetails.apierror.message);
          const errMessage = err.response.data.errorDetails.apierror.message;
          alert(errMessage);
          setState({ email: '', password: '', password1: '' });
        });
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
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
      <Modal
        show={login}
        onHide={handleCloseLogin}
        backdrop="static"
        // fullscreen="sm-down"
      >
        <Modal.Header closeButton>
          <Modal.Title>{!signup ? '로그인' : '회원가입'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="example@google.com"
                autoFocus
                required
                name="email"
                value={state.email}
                onChange={handleChangeState}
              />
              <div className="description">
                영어 소문자로 시작하며 숫자 혼용으로 8자 이상
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요"
                autoFocus
                required
                name="password"
                // aria-describedby="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                // title="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                value={state.password}
                onChange={handleChangeState}
              />
              <div className="description">
                영어 대소문자, 숫자, 특수문자 조합으로 8자 이상
              </div>
            </Form.Group>
            {!signup ? null : (
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>비밀번호 확인</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 한번 더 입력하세요"
                  autoFocus
                  name="password1"
                  // aria-describedby="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                  // title="비밀번호는 8자 이상의 영어 소문자와 대문자, 숫자가 조합된 것이어야 합니다"
                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  value={state.password1}
                  onChange={handleChangeState}
                />
              </Form.Group>
            )}
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
              <button
                className="social__button social__button--google"
                onClick={handleSocialGoogle}
              />
            </div>
            <br />
            <span>
              {!signup ? '아직 회원이 아니신가요?' : '계정이 이미 있으신가요?'}
            </span>
            <span className="change-login" onClick={() => setSignup(!signup)}>
              {!signup ? ' 회원가입' : ' 로그인'}
            </span>
            <br />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Close
          </Button>
          {!signup ? (
            <Button type="submit" variant="primary" onClick={handleLogin}>
              Log In
            </Button>
          ) : (
            <Button type="submit" variant="primary" onClick={handleSignup}>
              Sign Up
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalLogin;
