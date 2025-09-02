import { useReducer } from "react";
import TodoList from "./TodoList.jsx";
import InputForm from "./InputForm.jsx";

const fruitsReducer = (state, action) => {
  switch (action.type) {
    case "add_fruit":
      return [...state, action.payload];
    default:
      return state;
  }
};

const initialState = ["Mango", "Banan", "Smoczy owoc", "Jabłko"];

function AddFruitPage() {
  const [fruits, dispatch] = useReducer(fruitsReducer, initialState);

  const handleAddItem = (newFruit) => {
    if (newFruit.trim() !== "") {
      dispatch({ type: "add_fruit", payload: newFruit });
    }
  };

  return (
    <>
      <h1>Strona do dodawania owoców</h1>

      <InputForm onAddItem={handleAddItem} />

      {fruits.length > 0 ? (
        <TodoList lista={fruits} />
      ) : (
        <p>Lista jest pusta!</p>
      )}
    </>
  );
}

export default AddFruitPage;
