import React, { useEffect, useState } from "react";
import "./calendar.css";
import { BsArrowLeft, BsArrowRight, BsArrowDownShort } from "react-icons/bs";
import calendarData from "../../assets/data/calendarData.json";
import MonthsCard from "../monthCard/MonthsCard";
import { isToday } from "../../utils/isToday";

const locale = "it"; /* pretending locale is it ;)*/

export default function Calendar() {
  const newDate = new Date();
  const [date, setDate] = useState(newDate);
  const [currentDate, setCurrentDate] = useState({});
  const [ss, setSs] = useState();
  const [mm, setMn] = useState();
  const [hh, setHh] = useState();
  const [day, setDay] = useState();
  const [weekDay, setWeekDay] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();

  const [week, setWeek] = useState();
  const [selectedDate, setSelectedDate] = useState();

  const [showMonthsList, setShowMonthsList] = useState(false);

  const localCalendarData = calendarData.data.filter(
    (d) => d.locale === locale
  )[0];

  /* handlers */
  const handleShowMonthsList = () => {
    setShowMonthsList(!showMonthsList);
  };

  const selectMonth = (month) => {
    date.setMonth(month);
    setMonth(date.getMonth());
    setShowMonthsList(false);
  };

  const swiftWeek = (action) => {
    if (action === "forward") {
      date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
    }

    if (action === "backward") {
      /* prevent backwards action to the week before the current one*/
      if (week[0] < currentDate) {
        return;
      } else {
        date.setTime(date.getTime() - 7 * 24 * 60 * 60 * 1000);
      }
    }
    updateData();
  };

  const selectDay = (e) => {
    const d = new Date(+e.target.getAttribute("value"));
    /* prevent selecting days before today */
    const todayMidnight = new Date(
      currentDate.getTime() -
        currentDate.getHours() *
          currentDate.getMinutes() *
          currentDate.getSeconds() *
          currentDate.getMilliseconds()
    );
    if (d < todayMidnight) {
      return;
    } else {
      setDate(d);
    }
  };

  /* functions */
  function clock() {
    let d = new Date();
    setCurrentDate(d);
  }

  const getWeek = () => {
    let d = new Date(date.getTime());
    let days = [];
    while (d.getDay() !== 1) {
      d.setTime(d.getTime() - 24 * 60 * 60 * 1000);
    }
    days.push(d);
    for (let i = 1; i < 7; i++) {
      days.push(new Date(d.getTime() + i * 24 * 60 * 60 * 1000));
    }
    setWeek(days);
  };

  const updateData = () => {
    setMn(date.getMinutes());
    setHh(date.getHours());
    setDay(date.getDate());
    setWeekDay(date.getDay());
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  };

  /* useEffects */
  useEffect(() => {
    updateData();
    getWeek();
  }, [date.getTime()]);

  useEffect(() => {
    setSelectedDate(date);
    clock();
    const time = setInterval(() => clock(), 1000);
    return () => {
      clearInterval(time);
    };
  }, []);

  /* Components */
  const Week = () => {
    return (
      <>
        <tr>
          {week?.map((d, i) => {
            let dayDate = d.getDate();
            return (
              <td
                key={dayDate}
                value={d.getTime()}
                className={`weekDays ${isToday(d, currentDate) && "todayBox"} ${
                  d.getMonth() !== date.getMonth() && "notMonthDay"
                } ${dayDate == date.getDate() && "selectedDay"} `}
                onClick={selectDay}
              >
                {dayDate}
              </td>
            );
          })}
        </tr>
      </>
    );
  };

  return (
    <div className="calendar">
      <div className="topCalendarBox">
        <div className="arrow backWard">
          <BsArrowLeft onClick={() => swiftWeek("backward")} />
        </div>
        <div className="date">
          <p>
            {localCalendarData.months[month]} {day}
          </p>
          <BsArrowDownShort value={5} onClick={handleShowMonthsList} />
        </div>
        <div className="arrow forWard">
          <BsArrowRight onClick={() => swiftWeek("forward")} />
        </div>
      </div>
      <MonthsCard
        months={localCalendarData.months}
        show={showMonthsList}
        date={date}
        selectMonth={selectMonth}
      />
      <div className="weekBox">
        <table className="weekTable">
          <thead>
            <tr>
              {localCalendarData?.days.map((d) => {
                return <th key={d}>{d}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            <Week />
          </tbody>
        </table>
      </div>
      <div className="timeSlotsBox"></div>
    </div>
  );
}
