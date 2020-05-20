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
    <Table.Row key={index} isSelectable>
      <Pane display="flex" alignItems="center" marginLeft={16} width="100%">
        {isEditable ? (
          <>
            <TextInput
              width="auto"
              name="add-todo"
              placeholder={title}
              onChange={(e: any) => setNewTitle(e.target.value)}
              value={newTitle}
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
          </>
        ) : (
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Item
                  icon="cross"
                  onSelect={() =>
                    onEdit({
                      id: todo.id,
                      title: newTitle,
                      isCompleted: !todo.isCompleted,
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
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{title}</Text>
              {isCompleted && (
                <Badge marginLeft="auto" marginRight={16} color="green">
                  Completed
                </Badge>
              )}
            </Pane>
          </Popover>
        )}
      </Pane>
    </Table.Row>
  );
};

export default ToDoListItem;
