import React, { useState } from "react";

import "./styles.css";

function App() {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentId, setCurrentId] = useState(1); // initialize the ID to 1
  const [filter, setFilter] = useState(false);
  //Add new Task
  const handleAddTodo = () => {
    if (!newTodo) return;
    const newId = currentId + 1; // generate a new ID
    setTodos([...todos, { id: newId, name: newTodo, completed: false }]);
    setCurrentId(newId); // update the current ID to the new ID
    setNewTodo("");
    console.log(todos); // Check the todos array in the console
  };


  // Add/Remove checked item from list
  const handleCheck = (id) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex((todo) => todo.id === id);
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  //Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  return (
    <div className="app">
      <div>
        <input className="input"
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className="btnAdd" onClick={(e) =>handleAddTodo()}>Add Todo</button>
      </div>
    
      <h3>
        <input
          type="checkbox"
          id="myCheckbox"
          checked={filter}
          onChange={(e) => setFilter(e.target.checked)}
        ></input>
        Hide Completed Task
      </h3>
      
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        
        <div className="list-container">
          <ul>
            {todos.filter((todo) => !filter || !todo.completed).map((todo) => 
              <li key={todo.id}>
                <input checked={todo.completed} type="checkbox" onChange={() => handleCheck(todo.id)}  />
                {todo.completed ? <s>{todo.name}</s> : todo.name}
              </li> 
              )}
        </ul>
        </div>
      </div>
    </div>
  );
}

export default App