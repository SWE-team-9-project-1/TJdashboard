import React from 'react';
import './calendar.css';
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';

function EventCalendar(props) {
    return (<></>);
}

function App() {
  const dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 10);
  const minDate = new Date(new Date().getFullYear(), new Date().getMonth(), 6);
  const maxDate = new Date(new Date().getFullYear(), new Date().getMonth(), 25);
  return (
    //To check calendar views paste start="Decade" and depth="Year" in below code. Also remove range restriction i.e. min and max properties
    <CalendarComponent value={dateValue} min={minDate} max={maxDate}
    isMultiSelection={true}></CalendarComponent>
  );
}

export default EventCalendar;