import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoList from './components/todo-list';
import { Pane } from 'evergreen-ui';


function App() {
  return (
    <div className="App">
      <Pane
      height='100vh'
      width='100%'
      background="greenTint"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      >
         <ToDoList />
      </Pane>
    </div>
  );
}

export default App;
