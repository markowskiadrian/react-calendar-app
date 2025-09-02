function CalendarDay({ dayNumber, isSelected, onDayClick }) {
  return (
    <div
      className={`calendar-day ${isSelected ? "selected" : ""}`}
      onClick={() => onDayClick(dayNumber)}
    >
      {dayNumber}
    </div>
  );
}

export default CalendarDay;
