import React, { useState } from "react";
import { ToDo } from "./todo-list";
import {
  Popover,
  Position,
  Menu,
  Text,
  TextInput,
  Button,
  Badge,
  Pane,
  Table,
} from "evergreen-ui";

interface IProps {
  todo: ToDo;
  index: number;
  onDelete(index: number): void;
  onEdit(todo: ToDo): void;
}

const ToDoListItem: React.FC<IProps> = ({ todo, index, onDelete, onEdit }) => {
  const { id, title, isCompleted } = todo;
  const [isEditable, setIsEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  return (
    <Pane
      display="flex"
      alignItems="center"
      width="100%"
      padding={16}
      style={{ cursor: "pointer" }}
      borderBottom
    >
      {isEditable ? (
        <Pane>
          <TextInput
            name="edit-todo"
            placeholder={title}
            onChange={(e: any) => setNewTitle(e.target.value)}
            value={newTitle}
            isInvalid={newTitle.length === 0}
          />
          <Button
            marginLeft={16}
            onClick={() => {
              onEdit({
                id: id,
                title: newTitle,
                isCompleted: isCompleted,
              });
              setIsEditable(false);
            }}
          >
            Edit
          </Button>
        </Pane>
      ) : (
        <Popover
          position={Position.BOTTOM_LEFT}
          content={
            <Menu>
              <Menu.Item
                icon="cross"
                onSelect={() =>
                  onEdit({
                    id: id,
                    title: newTitle,
                    isCompleted: !isCompleted,
                  })
                }
              >
                Complete...
              </Menu.Item>
              <Menu.Item icon="edit" onSelect={() => setIsEditable(true)}>
                Edit...
              </Menu.Item>
              <Menu.Item
                icon="trash"
                intent="danger"
                onSelect={() => onDelete(id)}
              >
                Delete...
              </Menu.Item>
            </Menu>
          }
        >
          <Pane
            width="100%"
            height="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{title}</Text>
            {isCompleted && (
              <Badge marginLeft="auto" marginRight={30} color="green">
                Completed
              </Badge>
            )}
          </Pane>
        </Popover>
      )}
    </Pane>
  );
};

export default ToDoListItem;
