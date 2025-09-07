import { useState } from "react";
import CalendarDay from "../components/CalendarDay.jsx";

export function useCalendarLogic(events) {
  const WEEKDAY_NAMES = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

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

  return {
    currentMonthName,
    calendarDays,
    selectedDate,
    WEEKDAY_NAMES,
    goToPreviousMonth,
    goToNextMonth,
    handleDayClick,
  };
}
