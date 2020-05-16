import React, { useState } from 'react';
import { ToDo } from './todo-list';
import { Popover, Position, Menu, Text, TextInput, Button, Badge, Pane, Table } from 'evergreen-ui';


interface IProps {
    todo: ToDo;
    index: number;
    onDelete(index:number): void;
    onEdit(index:number, title:string): void;
}

const ToDoListItem: React.FC<IProps> = ({todo,index, onDelete, onEdit}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [title, setNewTitle] = useState(todo.title);
    const [isCompleted, toggleCompleted] = useState(todo.isCompleted)
    
    return (
        <Table.Row key={index} isSelectable>
            <Pane verticalAlign='center' marginLeft={16}>
        { isEditable ?
        <> 
        <TextInput
            name="add-todo"
            placeholder={todo.title}
            onChange={(e: any) => setNewTitle(e.target.value)}
            value={title}
          /> 
          <Button onClick={() => {onEdit(index, title); setIsEditable(false)}}>Edit</Button>
          </>
          :
        <Popover
        position={Position.BOTTOM_LEFT}
        content={
          <Menu>
              <Menu.Item icon="edit" onSelect={() => toggleCompleted(!isCompleted)} >
                Complete...
              </Menu.Item>
              <Menu.Item icon="edit" onSelect={() => setIsEditable(true)} >
                Edit...
              </Menu.Item>
              <Menu.Item icon="trash" intent="danger" onSelect={() => onDelete(index)}>
                Delete...
              </Menu.Item>
          </Menu>
        }
        >
           <Text  width='100%'>{title} {isCompleted && <Badge marginLeft='auto' marginRight={16} color="green">Completed</Badge>}</Text>
        </Popover>
    }
    </Pane>
    </Table.Row>
    )
}

export default ToDoListItem;