import './css/calender.css';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import { getCookie } from '../shared/cookie';
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';
// modal
import ModalDetail from './ModalDetail';
import { Modal } from 'react-bootstrap';

const Calendar = () => {
  let memberId = getCookie('memberId');
  const navigate = useNavigate();

  // 날짜 계산용 state
  const [date, setDate] = useState(new Date());
  // 달력에 그려주는 state
  const [dates, setDates] = useState([]);
  // axios 통신용 state
  const [calenderData, setCalenderData] = useState([]);
  // modal 표시용 state
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
      .getTargetPosts(memberId, viewDate.year, viewDate.month + 1)
      .then((res) => res.data?.data)
      .then((data) => {
        setCalenderData(data);
      });
  }, [date]);

  useEffect(() => {
    setDates(calenderData);
    console.log('calenderData', calenderData); // 이거 무슨 용도?
  }, [calenderData]);

  return (
    <div className="calender-container">
      <div className="calendar">
        <div className="header">
          <div className="year">{viewDate.year}</div>
          <span className="month">{viewDate.month + 1}</span>
          <div className="nav">
            <button className="nav-btn" onClick={() => changeMonth(-1)}>
              &lt;
            </button>
            <button className="nav-btn go-today" onClick={() => changeMonth(0)}>
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
              <>
                <div
                  className="date"
                  key={idx}
                  style={{
                    background: `url(${date.thumbnailUrl})`,
                    backgroundSize: 'cover',
                    // border: '3px solid white',
                    // backgroundColor: '#f0f0f0',
                  }}
                  onClick={() => {
                    // if (date.postId === 0) {
                    //   return null;
                    // } else {
                    //   setPostNumber(date.postId);
                    //   setIsOpen(true);
                    // }
                    if (date.postId !== 0) {
                      setPostNumber(date.postId);
                      setIsOpen(true);
                    }
                  }}
                >
                  {/* {date.thumbnailUrl ? (
                    <img src={date.thumbnailUrl} alt={date} />
                  ) : null} */}
                  <div>{date.createdDay}</div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <ModalDetail
        show={isopen}
        onHide={() => {
          setIsOpen(false);
        }}
        postId={postNumber}
        backdrop="static"
        keyboard={false}
      />
    </div>
  );
};

export default Calendar;
