import './css/calender.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Calendar = () => {
  const date = new Date();

  const viewYear = date.getFullYear();
  const viewMonth = date.getMonth();

  const prevLast = new Date(viewYear, viewMonth, 0);
  const thisLast = new Date(viewYear, viewMonth + 1, 0);

  const PLDate = prevLast.getDate();
  const PLDay = prevLast.getDay();

  const TLDate = thisLast.getDate();
  const TLDay = thisLast.getDay();

  const prevDates = [];
  const thisDates = [...Array(TLDate + 1).keys()].slice(1);
  const nextDates = [];

  if (PLDay !== 6) {
    for (let i = 0; i < PLDay + 1; i++) {
      prevDates.unshift(PLDate - i);
    }
  }
  for (let i = 1; i < 7 - TLDay; i++) {
    nextDates.push(i);
  }

  const dates = prevDates.concat(thisDates, nextDates);

  const img =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5LHQDLTKqbrymeP5odTzF3X1yLbj0WQI9mg&usqp=CAU';

  const navigate = useNavigate();

  return (
    <div className="calender-container">
      <div className="calendar">
        <div className="header">
          <div className="year-month">
            {viewYear}년 🍸 {viewMonth + 1}월
          </div>
          <div className="nav">
            <button className="nav-btn go-prev">&lt;</button>
            <button className="nav-btn go-today">Today</button>
            <button className="nav-btn go-next">&gt;</button>
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
                {date}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
