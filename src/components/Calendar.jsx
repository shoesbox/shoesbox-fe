import './css/calender.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { getCookie } from '../shared/cookie';
import ModalDetail from './ModalDetail';

const Calendar = ({ calMemberId, calMemberNickname }) => {
  let memberId = getCookie('memberId'); // 현재 달력이 로그인 유저인지 친구인지 비교하는 용
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // 날짜 계산용 state
  const [date, setDate] = useState(new Date());
  // 달력에 그려주는 state 
  const [dates, setDates] = useState([]);
  // axios 통신용 state //
  const [calenderData, setCalenderData] = useState([]);
  // modal 표시용 state //
  const [isopen, setIsOpen] = useState(false);
  // postid 넘기기용 state
  const [postNumber, setPostNumber] = useState();


  // 계산할 때 사용되지 않음, 연, 월 표시용
  const viewDate = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }, [date]);

  const changeMonth = (addMonth) => {
    if (addMonth !== 0) {
      date.setDate(1);
      date.setMonth(date.getMonth() + addMonth);
      setDate(new Date(date));
      setDates(calenderData);
    } else {
      setDate(new Date());
      setDates(calenderData);
    }
  };

  useEffect(() => {
    apis
      .getTargetPosts(calMemberId, viewDate.year, viewDate.month + 1)
      .then((res) => res.data?.data)
      .then((data) => {
        setCalenderData(data);
        setLoading(false);
      });
  }, [calMemberId, date, viewDate]);

  useEffect(() => {
    setDates(calenderData);
    // console.log('달력 전체 데이터', calenderData);
  }, [calenderData]);

  // 오늘날짜 표시용 선언
  const today = new Date().getDate();
  const thisMonth = new Date().getMonth() + 1;

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <div className="loading">
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <div className="calendar">
          <div className="header">
            <div className="year">
              <div>{calMemberNickname} ,</div>
              <div>{viewDate.year}</div>
            </div>
            <span className="month">{viewDate.month + 1}</span>
            <div className="nav">
              <button className="nav-btn" onClick={() => changeMonth(-1)}>
                &lt;
              </button>
              <button
                className="nav-btn go-today"
                onClick={() => changeMonth(0)}
              >
                Today
              </button>
              <button className="nav-btn" onClick={() => changeMonth(+1)}>
                &gt;
              </button>
            </div>
          </div>
          <div className="main">
            <div className="days">
              <div className="day">일</div>
              <div className="day">월</div>
              <div className="day">화</div>
              <div className="day">수</div>
              <div className="day">목</div>
              <div className="day">금</div>
              <div className="day">토</div>
            </div>
            <div className="dates">
              {dates.map((date, idx) => (
                <div
                  className="date"
                  key={idx}
                  onClick={() => {
                    // 년, 월이 바뀔 때를 생각하여, date 객체로 비교
                    let createdYear = date.createdYear;
                    let createdMonth = date.createdMonth;
                    let createdDay = date.createdDay;
                    let postDate = new Date(
                      createdYear,
                      createdMonth - 1,
                      createdDay
                    );
                    let maxDate = new Date();
                    maxDate.setMonth(maxDate.getMonth() + 1);
                    let minDate = new Date();
                    minDate.setMonth(minDate.getMonth() - 1);

                    if (postDate > minDate && postDate < new Date()) {
                      if (date.postId === 0) {
                        // 일기 주인과 로그인 유저가 같으면 일기 쓰기로 넘어가기
                        if (memberId === calMemberId) {
                          let result = window.confirm(
                            `${createdMonth}월 ${createdDay}일 일기를 작성하시겠어요?`
                          );
                          if (result === true) {
                            navigate('/write', {
                              state: {
                                year: createdYear,
                                month: createdMonth,
                                day: createdDay,
                              },
                            });
                          }
                        } else {
                          return null;
                        }
                      } else {
                        setPostNumber(date.postId);
                        setIsOpen(true);
                      }
                    } else {
                      // 한달 범위 바깥의 글에서 작동하는 부분
                      if (date.postId === 0) {
                        // 글이 없으면
                        return null;
                      } else {
                        // 글이 있으면 보여주자
                        setPostNumber(date.postId);
                        setIsOpen(true);
                      }
                    }
                  }}
                  // style={{
                  //   background: `url(${date.thumbnailUrl})`,
                  //   backgroundSize: 'cover',
                  // }}
                >
                  {date?.thumbnailUrl ? (
                    <img src={date.thumbnailUrl} alt="업로드 사진" />
                  ) : null}

                  {today === parseInt(date.createdDay) &&
                  thisMonth === date.createdMonth ? (
                    <div id="today">{date.createdDay}</div>
                  ) : (
                    <div>{date.createdDay}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ModalDetail
        show={isopen}
        onHide={() => {
          setIsOpen(false);
        }}
        postId={postNumber}
      />
    </>
  );
};

export default Calendar;
