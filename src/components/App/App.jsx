import moment from "moment";
import HeaderComponent from "../Header/HeaderComponent";
import MenuComponent from "../Menu/MenuComponent";
import CalendarGridComponent from "../CalendarGrid/CalendarGridComponent";
import "./app.scss";
import { useEffect, useState } from "react";
import EventModalComponent from "../EventModal/EventModalComponent";

const url = "http://localhost:8000/events";

const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};
function App() {
  moment.updateLocale("en", {
    week: {
      dow: 1,
    },
  });
  //const today = moment();
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () =>
    setToday((prev) => prev.clone().subtract(1, "month"));
  const todayHandler = () => console.log("today");
  const nextHandler = () => setToday((next) => next.clone().add(1, "month"));

  const [event, setEvent] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(null);

  const [events, setEvents] = useState([]);
  const startDateQuery = startDay.clone().format("X");
  const endDateQuery = startDay.clone().add(42, "days").format("X");

  useEffect(() => {
    fetch(`${url}?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then((res) => res.json())
      .then((res) => setEvents(res));
  }, [today]);

  const openModalEvent = (methodName, eventForUpdate) => {
    console.log("double click", methodName);
    setEvent(eventForUpdate || defaultEvent);
    setShowForm(true);
    setMethod(methodName);
  };

  const closeModalEvent = () => {
    setShowForm(false);
    setEvent(null);
  };

  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const eventFetchHandler = () => {
    const fetchUrl = method === "Update" ? `${url}/${event.id}` : `${url}/`;
    const httpMethod = method === "Update" ? "PATCH" : "POST";

    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (method === "Update") {
          setEvents((prevState) =>
            prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
          );
        } else {
          setEvents((prevState) => [...prevState, res]);
        }
        closeModalEvent();
      });
  };

  return (
    <>
      {isShowForm ? (
        <EventModalComponent
          title={event.title}
          closeModalEvent={closeModalEvent}
          changeEventHandler={changeEventHandler}
          method={method}
          eventFetchHandler={eventFetchHandler}
        />
      ) : null}
      <div className="shadow_wrapper">
        <MenuComponent />
        <HeaderComponent
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
        />
        <CalendarGridComponent
          startDay={startDay}
          today={today}
          events={events}
          openModalEvent={openModalEvent}
        />
      </div>
    </>
  );
}

export default App;
