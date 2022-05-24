import React from 'react';
import './calendar.css';
import {CalendarComponent} from '@syncfusion/ej2-react-calendars';

function EventCalendar() {
  var dateValue = new Date(new Date().getFullYear(), new Date().getMonth(), 24);
  var minDate = new Date(new Date().getFullYear() - 1, new Date().getMonth(), 1);
  var maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), 31);
  return (
    <CalendarComponent value={dateValue} min={minDate} max={maxDate}></CalendarComponent>
  );

}
export default EventCalendar;