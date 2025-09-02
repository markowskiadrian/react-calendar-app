function DateNavbar({ currentMonthName, onPrevious, onNext }) {
  return (
    <nav>
      <button onClick={onPrevious}>Poprzedni</button>
      <button onClick={onNext}>Następny</button>
      <p>{currentMonthName}</p>
    </nav>
  );
}

export default DateNavbar;
