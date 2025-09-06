import { useState } from "react";

function InfoPanel({ selectedDate, events, onEventAdd, onEventRemoval, onEventUpdate }) {
  const [newEventTitle, setNewEventTitle] = useState("");
  const formattedDate = selectedDate.toLocaleString("pl-PL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const handleSubmit = () => {
    onEventAdd(newEventTitle);
    setNewEventTitle("");
  };

  const handleEditClick = (event) => {
    setEditingEventId(event.id);
    setEditedTitle(event.title);
  }

  const handleSaveClick = () => {
    onEventUpdate(editingEventId, editedTitle);
    setEditingEventId(null);
  }

  return (
    <>
      <div className="info-panel">
        <h3>Wybrany dzień:</h3>
        <p>{formattedDate}</p>

        <h4>Wydarzenia:</h4>
        {events.length > 0 ? (
          <ul>
            {events.map((event) => (
              event.id === editingEventId ? (
                <li key={event.id}>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                  />
                  <button onClick={handleSaveClick}>Zapisz</button>
                </li>
              ) : (
                <li key={event.id}>
                  {event.title}
                  <button onClick={() => handleEditClick(event)}>Edyuj</button>
                  <button onClick={() => onEventRemoval(event.id)}>Usuń</button>
                </li>
              )
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
