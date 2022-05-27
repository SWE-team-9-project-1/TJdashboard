import FullCalendar from '@fullcalendar/react';
import React,{useEffect, useState} from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import'./calendar.css'
import { collection, getDocs } from "firebase/firestore";


function EventCalendar(props) {
  const calendarComponentRef = React.createRef();
  const [events, setEvents] = useState([]);


  const fetchEvents = async () => {
    const newArray = []
    const querySnapshot = await getDocs(collection(props.db, "events"));
    querySnapshot.forEach((doc) => {
      const start = new Date(doc.data().date);
      const description = doc.data().description;
      const id = doc.id;
      const title = doc.data().name;

      newArray.push({
        start,
        description,
        id,
        title
      })

    });
    setEvents(newArray)
    console.log(newArray);
    
  }

  useEffect(() => {

    fetchEvents();

    console.log(events);

  },[])

  return (
    <div className='fullcal'>
      <div className="event-calendar">
        &nbsp; (To add and event, click on on the date)
        <div className="event-calendar-1">
          <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              right: "prev,next today",
              center: "title",
              left: "dayGridMonth,timeGridWeek,timeGridDay"
              }}
            ref={calendarComponentRef}
            events={events}
          />
        </div>
      </div>
    </div>
  )
}


export default EventCalendar;