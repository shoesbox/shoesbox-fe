import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
import './css/loginmodal.css';
import { getCookie, deleteCookie } from '../shared/cookie';

function Header() {
  const [login, setLogin] = useState(false);
  const handleCloseLogin = () => setLogin(false);
  const handleShowLogin = () => setLogin(true);

  const navigate = useNavigate();

  const cookie = getCookie('accessToken');
  const [isLoggedin, setisLoggedin] = useState(false);
  useEffect(() => {
    if (cookie !== undefined) {
      setisLoggedin(true);
    } else {
      setisLoggedin(false);
    }
  }, [cookie]);

  const handleLogout = () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    alert('로그아웃 성공');
    window.location.replace('/');
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{
          backgroundColor: '#cce3de',
          fontWeight: '600',
        }}
        // variant='dark'
      >
        <Container>
          <Navbar.Brand
            onClick={() => {
              navigate('/');
            }}
            style={{ cursor: 'pointer' }}
          >
            SHOES 🍭 BOX
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {isLoggedin ? (
                <Nav.Link
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  My Moments
                </Nav.Link>
              ) : null}
              <Nav.Link
                onClick={() => {
                  navigate('/aboutus');
                }}
              >
                About us
              </Nav.Link>
            </Nav>
            <Nav>
              {isLoggedin ? (
                <>
                  {/* 로그인시 */}
                  <Nav.Link
                    onClick={() => {
                      navigate('/mypage');
                    }}
                  >
                    My Page
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Log Out</Nav.Link>
                </>
              ) : (
                <>
                  {/* 비로그인시 */}
                  <Nav.Link onClick={handleShowLogin}>Log In</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <LoginModal login={login} handleCloseLogin={handleCloseLogin} />
    </>
  );
}

export default Header;
