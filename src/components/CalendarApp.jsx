import { useState, useEffect } from "react";
import DateNavbar from "./DateNavbar.jsx";
import CalendarDay from "./CalendarDay.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import InfoPanel from "./InfoPanel.jsx";

const WEEKDAY_NAMES = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState(() => {
    const savedEventsJSON = localStorage.getItem("calendarEvents");

    if (savedEventsJSON == null) {
      return [];
    }

    const parsedEvents = JSON.parse(savedEventsJSON);

    const restoredEvents = parsedEvents.map((event) => {
      return {
        id: event.id,
        title: event.title,
        date: new Date(event.date),
      };
    });

    return restoredEvents;
  });

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const goToPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(currentMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(currentMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };
  const currentMonthName = currentMonth.toLocaleString("pl-PL", {
    month: "long",
    year: "numeric",
  });

  const handleDayClick = (dayNumber) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const clickedDate = new Date(year, month, dayNumber);

    setSelectedDate(clickedDate);
  };

  const generateDays = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    const days = [];

    for (let i = 1; i <= daysInMonth; i++) {
      let isSelected = false;

      const dayHasEvent = events.some((event) => {
        const isSameYear =
          event.date.getFullYear() === currentMonth.getFullYear();
        const isSameMonth = event.date.getMonth() === currentMonth.getMonth();
        const isSameDay = event.date.getDate() === i;
        return isSameYear && isSameMonth && isSameDay;
      });

      if (selectedDate) {
        const isSameYear =
          selectedDate.getFullYear() === currentMonth.getFullYear();
        const isSameMonth = selectedDate.getMonth() === currentMonth.getMonth();
        const isSameDay = selectedDate.getDate() === i;

        if ((isSameYear, isSameMonth, isSameDay)) {
          isSelected = true;
        }
      }
      days.push(
        <CalendarDay
          key={i}
          dayNumber={i}
          onDayClick={handleDayClick}
          isSelected={isSelected}
          hasEvent={dayHasEvent}
        />
      );
    }

    return days;
  };
  const getPaddingDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);

    const paddingDaysCount = (firstDayOfMonth.getDay() + 6) % 7;

    const paddingDays = [];

    for (let i = 0; i < paddingDaysCount; i++) {
      paddingDays.push(
        <div key={"padding-" + i} className="calendar-day-empty"></div>
      );
    }

    return paddingDays;
  };
  const daysOfMonth = generateDays();
  const paddingDays = getPaddingDays();
  const calendarDays = [...paddingDays, ...daysOfMonth];

  const handleUpdateEvent = (eventId, newTitle) => {
    const updatedEvents = events.map(event => {
      if(event.id === eventId){
        return {
          ...event, title: newTitle
        }
      } else {
        return event;
      }
    })

    setEvents(updatedEvents);
  }

  let eventsForSelectedDay = [];
  if (selectedDate) {
    eventsForSelectedDay = events.filter((event) => {
      const isSameYear =
        selectedDate.getFullYear() === event.date.getFullYear();
      const isSameMonth = selectedDate.getMonth() === event.date.getMonth();
      const isSameDay = selectedDate.getDate() === event.date.getDate();

      return isSameYear && isSameMonth && isSameDay;
    });
  }
  const handleAddEvent = (title) => {
    const newEvent = { id: Date.now(), date: selectedDate, title: title };
    setEvents([...events, newEvent]);
  };
  const handleDeleteEvent = (eventId) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    setEvents(updatedEvents);
  }

  return (
    <>
      <DateNavbar
        currentMonthName={currentMonthName}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
      />

      <CalendarGrid WEEKDAY_NAMES={WEEKDAY_NAMES} calendarDays={calendarDays} />

      {selectedDate && (
        <InfoPanel
          selectedDate={selectedDate}
          events={eventsForSelectedDay}
          onEventAdd={handleAddEvent}
          onEventRemoval={handleDeleteEvent}
          onEventUpdate={handleUpdateEvent}
        />
      )}
    </>
  );
}

export default CalendarApp;
