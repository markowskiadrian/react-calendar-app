import { useState, useEffect } from "react";
import DateNavbar from "./DateNavbar.jsx";
import CalendarDay from "./CalendarDay.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import InfoPanel from "./InfoPanel.jsx";
import { useCalendarLogic } from "../hooks/useCalendarLogic.jsx"

function CalendarApp() {
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

  const {
    currentMonthName,
    calendarDays,
    selectedDate,
    WEEKDAY_NAMES,
    goToNextMonth,
    goToPreviousMonth,
    handleDayClick
  } = useCalendarLogic(events);

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);


  const handleUpdateEvent = (eventId, newTitle) => {
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        return {
          ...event,
          title: newTitle,
        };
      } else {
        return event;
      }
    });

    setEvents(updatedEvents);
  };

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
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

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
