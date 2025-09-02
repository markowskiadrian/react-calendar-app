import { useRef } from 'react'

function ClickCounter(){
     const clickCountRef = useRef(0);

     function handleClick(){
          clickCountRef.current += 1;

          console.log(clickCountRef.current);
     }

     return(
          <>
          <h1>Kliknięcia:</h1>
          <p>Sprawdź wartość w konsoli po kliknięciu!</p>
          <button onClick={handleClick}>Kliknij mnie</button>
          </>
     )
}

export default ClickCounter