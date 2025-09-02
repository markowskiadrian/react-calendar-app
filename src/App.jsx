import "./App.css"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CalendarApp from "./components/CalendarApp.jsx"

function App(){
     return(
          <BrowserRouter>
               <Routes>
                    <Route path="/" element={<CalendarApp/>}/>

               </Routes>
          </BrowserRouter>
     )
}

export default App