function FoodList({potrawy}) {
  return (
    <>
      <h2>Moje ulubione potrawy:</h2>
      <ul>
          {potrawy.map((potrawa,index) => (
               <li key={index}>
                    {potrawa}
               </li>
          ))}
      </ul>
    </>
  );
}

export default FoodList;
