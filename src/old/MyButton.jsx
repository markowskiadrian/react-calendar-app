import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick(){
    setCount(count + 1);
  };

  return <button className="button-round" onClick={handleClick}>Kliknięto {count} razy.</button>;
}

export default MyButton;
