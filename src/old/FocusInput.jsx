import { useRef } from "react";

function FocusInput() {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.focus();
  };
  return (
    <>
      <h1>Użycie useRef</h1>

      <input type="text" ref={inputRef} />

      <button onClick={handleClick}>Ustaw ostrość na polu</button>
    </>
  );
}

export default FocusInput;
