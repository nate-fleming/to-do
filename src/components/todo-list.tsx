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
  UnorderedList,
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

  const fetchTodos = async () => {
    const response = await getTodos();
    response.sort((a: ToDo, b: ToDo) => a.id - b.id);
    setTodos(response);
  };

  const onAddTodo = async () => {
    setIsShown(false);
    await addTodo(newTodo);
    toaster.notify(`Added ${newTodo} to list`);
    fetchTodos();
  };

  const onDeleteTodo = async (id: number) => {
    const deletedTodo = todos.find((todo) => todo.id === id);
    toaster.notify(`Deleted ${deletedTodo?.title} from list`);
    await deleteTodo(id);
    fetchTodos();
  };

  const onEditToDo = async (todo: ToDo) => {
    await updateTodo(todo);
    fetchTodos();
  };

  return (
    <>
      <Button onClick={() => setIsShown(true)}>Add ToDo</Button>
      <Pane>
        <Dialog
          isShown={isShown}
          title="add-todo-modal"
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
