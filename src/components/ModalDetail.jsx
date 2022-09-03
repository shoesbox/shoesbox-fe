import React from 'react';
// import Container from 'react-bootstrap/Container';
import { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import CommentList from './CommentList';
import '../pages/css/detailpage.css';
const nickname = 'Sunny';
const title = '일기도 제목이  있다';
const date = '2022-08-30';
const images = [
  './images/h1.jpg',
  './images/h2.jpg',
  './images/h3.jpg',
  './images/h4.jpg',
  './images/h5.jpg',
  './images/h6.jpg',
  './images/h7.jpg',
  './images/h8.jpg',
  './images/h9.jpg',
  './images/h10.jpg',
];
const content = 'ㅋㅋㅋㅋㅋㅋ'.repeat(50);
const comments = [
  {
    postId: 1,
    commentId: 1,
    nickname: "hey",
    content: "lolololozzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz",
    createdAt: "22-08-30 15:33",
  },
  {
    postId: 1,
    commentId: 2,
    nickname: 'hey',
    content: 'lolololozzzzzzzzzz',
    createdAt: '22-08-30 15:33',
  },
  {
    postId: 1,
    commentId: 3,
    nickname: 'hey',
    content: 'lolololozzzzzzzzzz',
    createdAt: '22-08-30 15:33',
  },
];
const ImageCarousel = () => {
    return (
      <Carousel>
        {images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={image} alt={idx} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };
const ModalDetail = (props) => {
    return (
        <Modal {...props} className='detail-modal' centered size='lg' fullscreen='md-down'>
          <Modal.Header closeButton>
            <Modal.Title>
              <span>
                <strong>{title}</strong>
              </span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="detail-titlebox">
              <span>
                <strong>{nickname}</strong> <Button> <BsFillTelephoneForwardFill /> </Button>
              </span>
              <span> {date}</span>
            </div>
            <hr />
            <ImageCarousel />
            <hr />
            <div>{content}</div>
            <hr />
            <div className='detail-fix-del-btns'>
              <Button>수정하기</Button>
              <Button>삭제하기</Button>
            </div>
            <hr />
            <CommentList comments={comments} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      );
}
export default ModalDetail