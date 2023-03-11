import moment from "moment"
import Header from "../Header";
import Body from "../Body";
import CalendarGrid from "../CalendarGrid";
import './style.scss';
import {useEffect, useState} from "react";

const url = 'http://localhost:8000/events';
function App() {

  moment.updateLocale('en', {
    week: {
      dow: 1
    }
  });
  //const today = moment();
  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf('month').startOf('week');

  const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
  const todayHandler = () => console.log('today')
  const nextHandler = () => setToday(next => next.clone().add(1, 'month'));

  const [events, setEvents] = useState([]);
  const startDateQuery = startDay.clone().format('X');
  const endDateQuery = startDay.clone().add(42, 'days').format('X');

  useEffect(() => {
    fetch(`${url}?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
        .then(res => res.json())
        .then(res => setEvents(res))
  }, [today])
  return (
    <div className="shadow_wrapper">
      <Header />
      <Body
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
      />
      <CalendarGrid startDay={startDay} today={today} events={events} />
    </div>
  );
}

export default App;
