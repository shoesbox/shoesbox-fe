import '../pages/css/detailpage.css';
import { useRef, useState, useEffect } from 'react';
import { Button, Carousel, Container, Modal } from 'react-bootstrap';
import { BsFillTelephoneForwardFill } from 'react-icons/bs';
import CommentsList from './CommentsList';
import { useDispatch, useSelector } from 'react-redux';
import {
  getDetailThunk,
  getJsonCommentThunk,
  getJsonDetailThunk,
  getCommentThunk,
} from '../features/detailSlice';
import { apis } from '../api';

const ModalDetail = ({ postId, ...props }) => {
  //   console.log(postId);
  const dispatch = useDispatch();
  const post = useSelector((state) => state.detail.post);
  // const CommentsList = useSelector((state) => state.detail.CommentsList);

  useEffect(() => {
    // dispatch(getJsonDetailThunk(postId));
    if (postId !== (null || undefined)) {
      dispatch(getDetailThunk(postId));
    } // dispatch(getJsonCommentThunk(postId));
    // dispatch(getCommentThunk(postId));
  }, [postId]);

  const nickname = post?.nickname;
  const title = post?.title;
  const date = post?.date;
  const images = post.images;
  const urls = post?.url;
  const content = post?.content;
  // const comments = commentList;

  const ImageCarousel = () => {
    return (
      // <Carousel>
      //   {images?.map((image, idx) => (
      //     <Carousel.Item key={idx}>
      //       <img className="d-block w-100" src={image} alt={idx} />
      //     </Carousel.Item>
      //   ))}
      // </Carousel>
      <Carousel>
        {images?.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={image} alt={idx} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  return (
    <Modal
      {...props}
      className="detail-modal"
      centered
      size="md"
      fullscreen="sm-down"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div>{title}</div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="detail-titlebox">
          <span>
            <strong>{nickname}</strong>
            <Button>
              <BsFillTelephoneForwardFill />
            </Button>
          </span>
          <span>{date}</span>
        </div>
        <hr />
        <ImageCarousel />
        <hr />
        <div className="detail-content">{content}</div>
        {/* <hr /> */}
        <br />
        <div className="detail-fix-del-btns">
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
        <hr />
        <CommentsList postId={postId} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetail;
