function CalendarDay({ dayNumber, isSelected, onDayClick, hasEvent }) {
  return (
    <div
      className={`calendar-day ${isSelected ? "selected" : ""}`}
      onClick={() => onDayClick(dayNumber)}
    >
      {dayNumber}
      {hasEvent && <div className="event-indicator">
        </div>}
    </div>
  );
}

export default CalendarDay;
