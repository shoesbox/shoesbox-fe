import './css/calender.css';
import { Button, Dropdown } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apis } from '../api';
import axios from 'axios';
import { getCookie, setCookie } from '../shared/cookie';

const Calendar = () => {
  let memberId = getCookie('accessToken');
  const navigate = useNavigate();

  // 날짜 계산용 state
  const [date, setDate] = useState(new Date());
  // 달력에 그려주는 state
  const [dates, setDates] = useState([]);
  // axios 통신용 state
  const [calenderData, setCalenderData] = useState([]);

  // 계산할 때 사용되지 않음, 연, 월 표시용
  const viewDate = useMemo(() => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }, [date]);

  // 달력에 쓸 월, 일 계산용
  const calcDate = () => {
    // 지난 달 마지막 Date, 이번 달 마지막 Date
    const prevLast = new Date(date.getFullYear(), date.getMonth(), 0);
    const thisLast = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const prevLastDate = prevLast.getDate();
    const prevLastDay = prevLast.getDay();

    const thisLastDate = thisLast.getDate();
    const thisLastDay = thisLast.getDay();

    // Dates 기본 배열들
    const prevDates = [];
    // Array(n)로는 0부터 n-1까지의 배열이 생성되므로 1부터 n까지로 밀어주기
    const thisDates = [...Array(thisLastDate + 1).keys()].slice(1);
    const nextDates = [];

    // prevDates 계산
    if (prevLastDay !== 6) {
      for (let i = 0; i < prevLastDay + 1; i++) {
        prevDates.unshift(prevLastDate - i);
      }
    }

    // nextDates 계산
    for (let i = 1; i < 7 - thisLastDay; i++) {
      nextDates.push(i);
    }

    // Tray 작성
    let newPrevDates = prevDates.reduce((arr, v) => {
      arr.push({ day: v, url: '' });
      return arr;
    }, []);

    let newThisDates = [];

    for (let i = 0; i < thisDates.length; i++) {
      if (thisDates[i] == calenderData[i]?.postId) {
        newThisDates.push({
          day: thisDates[i],
          url: calenderData[i]?.thumbnailUrl,
        });
      } else {
        newThisDates.push({ day: thisDates[i], url: '' });
      }
    }

    let newNextDates = nextDates.reduce((arr, v) => {
      arr.push({ day: v, url: '' });
      return arr;
    }, []);

    console.log(
      '전체배열 한번 보자',
      newPrevDates.concat(newThisDates, newNextDates)
    );

    return newPrevDates.concat(newThisDates, newNextDates);
  };

  const changeMonth = (addMonth) => {
    if (addMonth !== 0) {
      date.setDate(1);
      date.setMonth(date.getMonth() + addMonth);
      setDate(new Date(date));
      setDates(calcDate());
    } else {
      setDate(new Date());
      setDates(calcDate());
    }
  };

  useEffect(() => {
    apis
      .getTargetPosts(memberId, viewDate.year, viewDate.month)
      .then((res) => res.data?.data.content)
      .then((data) => {
        setCalenderData(data);
      });
  }, []);

  useEffect(() => {
    setDates(calcDate());
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
            <Button className="nav-btn go-next">&gt;</Button>
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
            {dates.map((day, idx) => (
              <div
                className="date"
                key={idx}
                style={{
                  background: `url(${day.url})`,
                  backgroundSize: 'cover',
                }}
                onClick={() => navigate('/detail')}
              >
                <span>{day.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
