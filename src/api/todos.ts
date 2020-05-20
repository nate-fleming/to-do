import fetcher from "./fetcher";
import { ToDo } from "../components/todo-list";

const url = "https://localhost:5001/todos";

export const getTodos = () => {
  return fetcher(url);
};

export const addTodo = (title: string) => {
  return fetcher(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Title: title }),
  });
};

export const updateTodo = (todo: ToDo) => {
  return fetcher(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
};

export const deleteTodo = (id: number) => {
  return fetcher(`${url}/${id}`, {
    method: "DELETE",
  });
};
