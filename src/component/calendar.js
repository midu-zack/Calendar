import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

function MyCalendar() {
  const [date, setDate] = useState(new Date());
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState({});

  const onChange = date => {
    setDate(date);
  };

  const onActiveStartDateChange = ({ activeStartDate }) => {
    const firstDayOfMonth = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth(), 1);
    setDate(firstDayOfMonth);
    setEventText('');
  };

  const handleInputChange = event => {
    setEventText(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formattedDate = date.toDateString();

    const existingEvents = events[formattedDate] || [];
    const updatedEvents = [...existingEvents, eventText];

    setEvents({ ...events, [formattedDate]: updatedEvents });

    setEventText('');
  };

  const handleDelete = (eventDate, eventIndex) => {
    const updatedEvents = { ...events };
    updatedEvents[eventDate] = updatedEvents[eventDate].filter((_, index) => index !== eventIndex);
    setEvents(updatedEvents);
  };

  return (
    <div className="calendar-container">
      <h2>Todo App Calendar</h2>
      <div className="calendar">
        <Calendar
          onChange={onChange}
          value={date}
          onActiveStartDateChange={onActiveStartDateChange}
        />
      </div>
      <div className="event-form">
        <h3>{date.toDateString()}</h3>
        <form onSubmit={handleSubmit} className="event-input-container">
          <input 
            type="text" 
            value={eventText} 
            onChange={handleInputChange} 
            placeholder="Add event" 
            className="event-input"
          />
          <button type="submit" className="submit-button">Add Event</button>
        </form>
        <ul className="event-list">
          {events[date.toDateString()] && events[date.toDateString()].map((event, index) => (
            <li key={index} className="event-item">
              {event}
              <button onClick={() => handleDelete(date.toDateString(), index)} className="delete-button">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MyCalendar;
