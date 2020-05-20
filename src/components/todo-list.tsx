import React, { useState, useEffect } from "react";
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
import { getTodos, addTodo, updateTodo, deleteTodo } from "../api/todos";

export type ToDo = {
  id: number;
  title: string;
  isCompleted: boolean;
};

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ToDo[]>([]);
  const [isShown, setIsShown] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    getTodos().then((res) => {
      setTodos(res);
    });
  };

  const onAddTodo = () => {
    setIsShown(false);
    addTodo(newTodo);
    if (newTodo.length) toaster.notify(`Added ${newTodo} to list`);
  };

  const onDeleteTodo = (id: number) => {
    const deletedTodo = todos.find((todo) => todo.id === id);
    toaster.notify(`Deleted ${deletedTodo} from list`);
    deleteTodo(id);
  };

  const onEditToDo = (todo: ToDo) => {
    updateTodo(todo);
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
            {todos.length > 0 &&
              todos.map((todo, i) => (
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
