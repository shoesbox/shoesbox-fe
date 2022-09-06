import './css/loginmodal.css';
import './css/header.css';
import { useEffect, useState } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModal';
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
            className="brand-logo"
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
                  className="menu"
                >
                  My Moments
                </Nav.Link>
              ) : null}
              <Nav.Link
                onClick={() => {
                  navigate('/aboutus');
                }}
                className="menu"
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
                    className="menu"
                  >
                    My Page
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="menu">
                    Log Out
                  </Nav.Link>
                </>
              ) : (
                <>
                  {/* 비로그인시 */}
                  <Nav.Link onClick={handleShowLogin} className="menu">
                    Log In
                  </Nav.Link>
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
