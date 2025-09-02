import { useState } from "react";
import DateNavbar from "./DateNavbar.jsx";
import CalendarDay from "./CalendarDay.jsx";
import CalendarGrid from "./CalendarGrid.jsx";
import InfoPanel from "./InfoPanel.jsx";

const WEEKDAY_NAMES = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

function CalendarApp() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([
    { date: new Date(2025, 7, 15), title: "Spotkanie projektowe" }, // Sierpień
    { date: new Date(2025, 7, 22), title: "Wizyta u dentysty" },
    { date: new Date(2025, 8, 1), title: "Rozpoczęcie roku szkolnego" }, // Wrzesień
  ]);

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
    const newEvent = {date: selectedDate, title: title};
    setEvents([...events, newEvent]);
  }

  return (
    <>
      <DateNavbar
        currentMonthName={currentMonthName}
        onPrevious={goToPreviousMonth}
        onNext={goToNextMonth}
      />

      <CalendarGrid WEEKDAY_NAMES={WEEKDAY_NAMES} calendarDays={calendarDays} />

      {selectedDate && <InfoPanel selectedDate={selectedDate} events={eventsForSelectedDay} onEventAdd={handleAddEvent}/>}
    </>
  );
}

export default CalendarApp;
