function TodoList({ lista }) {
  return (
    <>
      <h2>Lista:</h2>
      <ul>
        {lista.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;
