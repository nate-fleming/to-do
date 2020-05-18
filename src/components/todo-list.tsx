import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  Button,
  Pane,
  Dialog,
  TextInput,
  toaster,
  Card,
} from "evergreen-ui";
import ToDoListItem from "./todo";

export type ToDo = {
  title: string;
  isCompleted: boolean;
};

const sampleTodos: ToDo[] = [
  { title: "Hello", isCompleted: false },
  { title: "There", isCompleted: false },
];

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState(sampleTodos);
  const [isShown, setIsShown] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const onAddTodo = () => {
    setTodos([...todos, { title: newTodo, isCompleted: false }]);
    setIsShown(false);
    setNewTodo("");
    if (newTodo.length) toaster.notify(`Added ${newTodo} to list`);
  };

  const onDeleteTodo = (i: number) => {
    const filteredTodos = todos.filter((todo, index) => index !== i);
    toaster.notify(`Deleted ${todos[i].title} from list`);
    setTodos(filteredTodos);
  };

  const onEditToDo = (i: number, title: string) => {
    const newTodos = todos.map((todo, index) =>
      index === i ? { ...todo, title: title } : todo
    );
    setTodos(newTodos);
    console.log(todos);
  };
  return (
    <>
      <Button onClick={() => setIsShown(true)}>Add ToDo</Button>
      <Pane>
        <Dialog
          isShown={isShown}
          title="Add ToDo"
          onCancel={() => setIsShown(false)}
          onConfirm={onAddTodo}
          confirmLabel="Add ToDo"
        >
          <TextInput
            name="add-todo"
            placeholder="Type your todo here..."
            onChange={(e: any) => setNewTodo(e.target.value)}
            value={newTodo}
            isInvalid={newTodo.length === 0}
          />
        </Dialog>
      </Pane>
      <Card
        elevation={1}
        float="left"
        width={400}
        height="auto"
        background="white"
      >
        <Table>
          <TableHead>
            <Table.TextHeaderCell>Todos</Table.TextHeaderCell>
          </TableHead>
          <TableBody>
            {todos.map((todo, i) => (
              <ToDoListItem
                key={i}
                todo={todo}
                index={i}
                onDelete={onDeleteTodo}
                onEdit={onEditToDo}
              />
            ))}
          </TableBody>
        </Table>
      </Card>
    </>
  );
};

export default ToDoList;
