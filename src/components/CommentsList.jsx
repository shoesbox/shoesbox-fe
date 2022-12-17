import React from 'react';
import { useRef, useState, useEffect, memo } from 'react';
import { Button, Form, InputGroup, Spinner } from 'react-bootstrap';
import {
  BsFillEraserFill,
  BsX,
  BsArrowReturnLeft,
  BsTrash,
} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCommentThunk,
  delCommentThunk,
  getCommentThunk,
  putCommentThunk,
  switchLoading,
} from '../features/detailSlice';
import { getCookie } from '../shared/cookie';

const CommentsList = ({ postId }) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.detail.commentList);
  const loading = useSelector((state) => state.detail.loading);
  const memberId = getCookie('memberId');
  const commentRef = useRef();
  const [commentStatus, setComment] = useState(true);
  const [pick, setPick] = useState();
  const [onEdit, setEdit] = useState(false);
  var tmp = '';

  // 댓글 등록 버튼 눌렀을 때 실행되는 함수
  const onClickComment = () => {
    if (commentRef.current.value.trim() !== '') {
      const content = commentRef.current?.value;
      // dispatch(postJsonCommentThunk({ postId, content }));
      dispatch(addCommentThunk({ postId, content }));
      commentRef.current.value = '';
      commentRef.current.focus();
    }
  };

  // 댓글 삭제 버튼 눌렀을 때
  const onClickDelBtn = (commentId) => {
    // dispatch(delJsonCommentThunk(commentId))
    dispatch(delCommentThunk(commentId));
  };

  // 댓글 수정 버튼 눌렀을 때, 수정 가능
  const onClickFixBtn = (commentId, content) => {
    setPick(commentId);
    setEdit(true);
  };

  // 댓글 수정 모드 눌렀을 때의 버튼, 수정 입력 가능
  // 그 전 내용과 일치할 경우 팝업 노출
  const onClickFixSubmitBtn = (commentId) => {
    // console.log('변경될 값:', tmp, commentId);
    if (tmp === '') {
      alert('내용이 이전과 일치합니다. 댓글을 수정해주세요!');
      return null;
    } else {
      dispatch(switchLoading(true));
      // dispatch(patchJsonCommentThunk({ commentId, content: tmp })).then(
      dispatch(putCommentThunk({ commentId, content: tmp })).then(
        setEdit(false)
      );
      setEdit(false);
    }
    //  dispatch(updatePicked(commentId))
  };

  // 댓글에 아무것도 입력되지 않으면, 버튼 작동하지 않음
  const onChangeCommentStatus = (e) => {
    if (e.target.value.trim() !== '') {
      setComment(false);
    }
  };

  // tmp에 onChange 될 때 값 저장 - state 사용하면 렌더링 문제 발생
  const onChangeFixCommentStatus = (e) => {
    tmp = e.target.value;
    // console.log('변경될 값:',  tmp);
  };

  // 수정 버튼을 클릭하면 비노출
  const CommentSpan = ({ commentId, content }) => {
    return !(onEdit && pick === commentId) && <span>{content}</span>;
  };

  // 수정 버튼을 클릭하면 노출
  const FixInput = ({ commentId, content }) => {
    // if (parseInt(pick) === parseInt(commentId)) {
    if (onEdit && pick === commentId) {
      return (
        <Form.Control
          type="text"
          defaultValue={content}
          autoFocus
          onChange={(e) => onChangeFixCommentStatus(e)}
        />
      );
    }
  };

  // 수정 버튼을 클릭하기전, 클릭 후가 나뉨 - 수정버튼
  const FixButton = ({ commentId }) => {
    return !(onEdit && pick === commentId) ? (
      <Button onClick={() => onClickFixBtn(commentId)}>
        <BsFillEraserFill />
      </Button>
    ) : (
      <Button onClick={() => onClickFixSubmitBtn(commentId)}>
        <BsArrowReturnLeft />
      </Button>
    );
  };

  // 수정 버튼을 클릭하기전, 클릭 후가 나뉨 - 삭제버튼
  const DelButton = ({ commentId }) => {
    return !(onEdit && pick === commentId) ? (
      <Button onClick={() => onClickDelBtn(commentId)}>
        <BsTrash />
      </Button>
    ) : (
      <Button onClick={() => setEdit(false)}>
        <BsX />
      </Button>
    );
  };

  // 댓글리스트를 불러옴
  useEffect(() => {
    if (postId !== (null || undefined)) {
      dispatch(getCommentThunk(postId));
    }
  }, [comments.length, postId]);

  return (
    <div className="detail-comments-wrap">
      {comments?.length > 0 ? (
        comments?.map((comment, idx) => (
          <div key={idx} className="detail-comments">
            <div className="detail-comment-contents">
              {!(onEdit && pick === comment?.commentId) && (
                <>
                  <img src={comment?.profileImageUrl} alt="프로필 사진" />
                  <span>{comment?.nickname}</span>
                </>
              )}
              {loading && pick === comment.commentId ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                <>
                  <CommentSpan
                    commentId={comment?.commentId}
                    content={comment.content}
                  />
                  <FixInput
                    commentId={comment?.commentId}
                    content={comment.content}
                  />
                </>
              )}
            </div>
            {parseInt(memberId) === parseInt(comment.memberId) && (
              <div className="detail-comment-btns">
                <FixButton commentId={comment?.commentId} />
                <DelButton commentId={comment?.commentId} />
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="pre-comments">첫번째 댓글의 주인공이 되어보세요!</div>
      )}
      <hr />
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
            variant="primary"
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

export default memo(CommentsList);
