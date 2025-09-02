function CalendarGrid({ WEEKDAY_NAMES, calendarDays }) {
  return (
    <div className="calendar-grid">
      {WEEKDAY_NAMES.map((name) => (
        <div key={name} className="weekday-name">
          {name}
        </div>
      ))}

      {calendarDays.map((day) => day)}
    </div>
  );
}

export default CalendarGrid;
