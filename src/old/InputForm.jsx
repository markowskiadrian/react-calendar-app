import "./App.css"
import { useState } from "react";

function InputForm( {onAddItem} ){
     const [inputValue, setInputValue] = useState("");

     const handleSubmit = (e) => {
          e.preventDefault();
          onAddItem(inputValue);
          setInputValue("");
     }

     return(
          <>
          <form action="" className="flex" onSubmit={handleSubmit}>
               <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>

               <button type="submit" className="button-round">Dodaj</button>
          </form>
          </>
     )
}

export default InputForm