import React from 'react';
import moment from 'moment';
import './Calendar.scss';

function Calendar() {
  const daysOfWeek = Array.from({ length: 7 }, (v, i) => moment().startOf('week').add(i, 'days'));

  return (
    <div className="calendar">
        <h4 className='calendar__title'>Today</h4>
        <div className='calendar__view'>
      {daysOfWeek.map((day, index) => (
        <div key={index} className={`calendar__day ${day.isSame(moment(), 'day') ? 'calendar__day--today' : ''}`}>
          <span className='calendar__week'>{day.format('ddd')}</span>
          <br />
          <span className='calendar__date'>{day.format('DD')}</span>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Calendar;
