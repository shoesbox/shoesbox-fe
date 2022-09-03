import './css/calender.css';
import { Button, Dropdown } from 'react-bootstrap';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Calendar = () => {
  // 날짜 계산용 state
  const [date, setDate] = useState(new Date());
  // 달력에 그려주는 state
  const [dates, setDates] = useState([]);

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

    const PLDate = prevLast.getDate();
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    // Dates 기본 배열들
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    // prevDates 계산
    if (PLDay !== 6) {
      for (let i = 0; i < PLDay + 1; i++) {
        prevDates.unshift(PLDate - i);
      }
    }
    // nextDates 계산
    for (let i = 1; i < 7 - TLDay; i++) {
      nextDates.push(i);
    }

    // Dates 합치기
    return prevDates.concat(thisDates, nextDates);
  };

  useEffect(() => {
    setDates(calcDate());
  }, [date]);

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    // const res = await axios.get('http://localhost:3030/posts')
    // console.log('All Posts', res.data);
    const { data } = await axios.get('http://localhost:3030/posts');
    console.log('All Posts', data);
    setPosts(data);
  };

  const img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5LHQDLTKqbrymeP5odTzF3X1yLbj0WQI9mg&usqp=CAU';
  // `${posts[0].images[0]}`;

  console.log(posts[0]);
  useEffect(() => {
    getAllPosts();
  }, []);

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

  return (
    <div className="calender-container">
      <div className="calendar">
        <div className="header">
          <div className="year-month">
            {viewDate.year}년 🍸 {viewDate.month + 1}월
          </div>
          <div className="nav">
            <button className="nav-btn go-prev" onClick={() => changeMonth(-1)}>
              &lt;
            </button>
            <button className="nav-btn go-today" onClick={() => changeMonth(0)}>
              Today
            </button>
            <button className="nav-btn go-next" onClick={() => changeMonth(+1)}>
              &gt;
            </button>
            {/* <Button className="nav-btn go-next">&gt;</Button> */}
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
                style={{ background: `url(${img})`, backgroundSize: 'cover' }}
                onClick={() => navigate('/detail')}
              >
                <span>{date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
