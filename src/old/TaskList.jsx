import { useState, useEffect } from "react";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );

        const data = await response.json();

        setTasks(data);
      } catch (error) {
        console.log("Wystąpił błąd: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    
    fetchTasks();
  }, []);

  if (isLoading) {
    return <p>Ładowanie zadań...</p>;
  }

  return (
    <>
      <h1>Lista zadań:</h1>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </>
  );
}

export default TaskList;
