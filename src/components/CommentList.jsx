import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { BsFillEraserFill, BsX } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentThunk,
  delCommentThunk,
  delJsonCommentThunk,
  postJsonCommentThunk,
} from '../features/detailSlice';

const CommentList = ({ postId, comments }) => {
  const dispatch = useDispatch();
  const commentRef = useRef();
  const [commentStatus, setComment] = useState(true);

  const onClickComment = () => {
    if (commentRef.current.value.trim() !== '') {
      // console.log(commentRef.current.value);
      const content = commentRef.current?.value;
      // dispatch(postJsonCommentThunk({ postId, content }));
      dispatch(addCommentThunk({ postId, content }));
      commentRef.current.value = '';
      commentRef.current.focus();
    }
  };

  const onClickDelBtn = ({ commentId, e }) => {
    // console.log(commentId);
    // dispatch(delJsonCommentThunk(commentId))
    dispatch(delCommentThunk(commentId));
  };

  const onChangeCommentStatus = (e) => {
    if (e.target.value.trim() !== '') {
      setComment(false);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="detail-comments-wrap">
      {comments?.length !== 0
        ? comments?.map((comment, idx) => (
            <div key={idx} className="detail-comments">
              <div className="detail-comment-contents">
                <span>{comment?.nickname}</span>
                <span>{comment?.content}</span>
              </div>
              <div>
                <span className="detail-comment-time">{comment.createdAt}</span>
              </div>
              <div className="detail-comment-btns">
                <Button>
                  <BsFillEraserFill />
                </Button>
                <Button
                  // jsondb 때문에 이렇게 설정 - 임시로 commentId가 존재하면 commentId 값을 불러들이고, 아니면 id  값으로
                  onClick={(e) =>
                    onClickDelBtn({
                      commentId: comment.commentId
                        ? comment.commentId
                        : comment.id,
                      e,
                    })
                  }
                >
                  <BsX />
                </Button>
              </div>
              <hr />
            </div>
          ))
        : null}

      <div>
        <InputGroup>
          <Form.Control
            ref={commentRef}
            placeholder="친구에게 안부를 물어봅시다 :)"
            onChange={onChangeCommentStatus}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !commentStatus) {
                onClickComment();
              }
            }}
          />
          <Button
            variant="outline-secondary"
            disabled={commentStatus}
            onClick={onClickComment}
          >
            등록
          </Button>
        </InputGroup>
      </div>
    </div>
  );
};

export default CommentList;
