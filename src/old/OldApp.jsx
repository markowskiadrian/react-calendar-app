import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./HomePage.jsx"
import AboutPage from "./AboutPage.jsx"
import TasksPage from "./TasksPage.jsx"
import AddFruitPage from "./AddFruitPage.jsx"
import FocusInput from "./FocusInput.jsx"
import ClickCounter from "./ClickCounter.jsx";



function App() {
  return (
    <BrowserRouter>
    <nav>
      <Link to="/">Strona główna</Link> |  <Link to="/about">O nas</Link> | <Link to="/tasks">Zadania</Link> |  <Link to="/add-fruit">Dodawanie owoców</Link>
    </nav>

    <FocusInput />
    <ClickCounter />

      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/tasks" element={<TasksPage />}/>
        <Route path="/add-fruit" element={<AddFruitPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
