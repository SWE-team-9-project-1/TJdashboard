import FullCalendar from "@fullcalendar/react";
import React, { useEffect, useState } from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";
import { collection, getDocs, setDoc , doc, deleteDoc} from "firebase/firestore";

function EventCalendar(props) {
  const calendarComponentRef = React.createRef();
  const [events, setEvents] = useState([]);

  function makeid(length) {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const fetchEvents = async () => {
    const newArray = [];
    const querySnapshot = await getDocs(collection(props.db, "events"));
    querySnapshot.forEach((doc) => {
      let start;
      if(doc.data().dateStr){
        start = new Date(doc.data().dateStr);
        start.setUTCHours(16-12)
      }else{
        start = new Date(doc.data().date);
      }
      const description = doc.data().description;
      const id = doc.id;
      const title = doc.data().name;

      newArray.push({
        start,
        description,
        id,
        title,
      });
    });
    setEvents(newArray);
    console.log(newArray);
  };

  const onEventClick =  async (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event`)) {
      console.log(clickInfo)

      let deletedEvents = events;

      deletedEvents = deletedEvents.filter(function( obj ) {
        return obj.id !== clickInfo.event.id;
      });

      await deleteDoc(doc(props.db, "events", clickInfo.event.id));

      setEvents(deletedEvents);


    }

  }

  const onDateSelect = (selectInfo) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;
    const id = makeid(20);
    const curEvents = events;

    console.log('selectInfo', selectInfo);

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: id,
        title,
        start: selectInfo.date,
      });

      curEvents.push({ id: id, title, start: selectInfo.date, description: '', dateStr: selectInfo.dateStr})
    }

    setEvents(curEvents);

    setDoc(doc(props.db, "events", events[events.length - 1].id), {
      name: events[events.length - 1].title,
      description: "",
      date: events[events.length - 1].start,
      dateStr: selectInfo.dateStr,
    })


    console.log(events);
  };

  const onEventAdd = async () => {

    // console.log('sdfnskdnfksdf')
    // setDoc(doc(props.db, "events", events[events.length - 1].id), {
    //   title: events[events.length - 1].title,
    //   description: "",
    //   date: events[events.length - 1].start,
    // })
  }

  useEffect(() => {
    fetchEvents();

    console.log(events);
  }, []);

  return (
    <div className="fullcal">
      <div className="event-calendar">
        &nbsp; (To add and event, click on on the date)
        <div className="event-calendar-1">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              right: "prev,next today",
              center: "title",
              left: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            ref={calendarComponentRef}
            events={events}
            dateClick={onDateSelect}
            eventAdd={onEventAdd}
            eventClick={onEventClick}
          />
        </div>
      </div>
    </div>
  );
}

export default EventCalendar;
