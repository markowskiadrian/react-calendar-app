import { useState } from "react";

function InfoPanel({ selectedDate, events, onEventAdd }) {
  const [newEventTitle, setNewEventTitle] = useState("");
  const formattedDate = selectedDate.toLocaleString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const handleSubmit = () => {
    onEventAdd(newEventTitle);
    setNewEventTitle("");
  };
  return (
    <>
      <div className="info-panel">
        <h3>Wybrany dzień:</h3>
        <p>{formattedDate}</p>

        <h4>Wydarzenia:</h4>
        {events.length > 0 ? (
          <ul>
            {events.map((event, index) => (
              <li key={index}>{event.title}</li>
            ))}
          </ul>
        ) : (
          <p>Brak wydarzeń tego dnia.</p>
        )}
      </div>

      <div className="add-event-form">
        <h4>Dodaj nowe wydarzenie:</h4>
        <input
          type="text"
          placeholder="Tytuł wydarzenia..."
          value={newEventTitle}
          onChange={(e) => setNewEventTitle(e.target.value)}
        ></input>

        <button onClick={handleSubmit}>Dodaj</button>
      </div>
    </>
  );
}
export default InfoPanel;
