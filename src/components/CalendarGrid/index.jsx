import React from 'react';
import './style.scss';
import moment from "moment";

const CalendarGrid = (props) => {
    const totalDays = 42;
    const day = props.startDay.clone().subtract(1, 'day');
    const daysArray = [...Array(totalDays)].map(() => day.add(1, 'day').clone());
    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (month) => props.today.isSame(month, 'month');
    console.log(props.events)

    return (
        <>
        <div className="grid_wrapper" style={
            {
                backgroundColor: '#1E1F21',
                borderBottom: '1px solid #4D4C4D'
            }
        }>
            {[...Array(7)].map((_, index) => (
                <div className="cell_wrapper"
                     style={
                    {
                        minHeight: '24px',
                        color: '#DDDDDD'
                    }
                }
                     key={index}>
                    <div className="row_in_cell" style={
                        {
                            paddingRight: '8px'
                        }
                    }>
                        {moment().day(index + 1).format('ddd')}
                    </div>
                </div>
            ))}
        </div>
        <div className="grid_wrapper">
            {
                daysArray.map((dayItem) => (
                    <div
                        className="cell_wrapper"
                        key={dayItem.format('DDMMYYYY')}
                        style={
                        {
                            minHeight: '80px',
                            backgroundColor: dayItem.day() === 6 || dayItem.day() === 0 ? '#272829' : '#1E1F21',
                            color: isSelectedMonth(dayItem) ? '#DDDDDD' : '#555759'
                        }
                    }>
                        <div className="row_in_cell">
                            <div className="show_day_wrapper">
                                <div className="day_wrapper">
                                    {
                                        isCurrentDay(dayItem) ? (
                                            <div className="current_day">
                                                {dayItem.format('D')}
                                            </div>
                                        ) : (
                                            dayItem.format('D')
                                        )
                                    }
                                </div>
                            </div>
                            <ul className="event_list">
                                {
                                    props.events
                                        .filter(event => event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X'))
                                        .map(event => (
                                            <li key={event.id}>
                                                <button className="event_item_wrapper">
                                                    {event.title}
                                                </button>
                                            </li>
                                        ))
                                }
                            </ul>
                        </div>
                    </div>
                ))
            }
        </div>
        </>
    );
};

export default CalendarGrid;