import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import TodoEdit from './TodoEdit';
import { Todo }  from '../types';

interface TodoListProps {
  todos: Todo[];
  onEdit: (todoEdit: Todo) => void;
  onRemove: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onEdit, onRemove }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleEditClick = (id: number) => {
    console.log(`handleEditClick: `, {id});
    setEditingId(id);
    setShowModal(true);
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setShowModal(false);
  };

  const handleSaveClick = (todoEdit: Todo) => {
    onEdit(todoEdit);
    setEditingId(null);
    setShowModal(false);
  };

  const handleRemoveClick = (id: number) => {
    onRemove(id);
  };

  if (todos.length === 0) return <></>;

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Completed</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo, index) => {
          return (
          <tr key={`${index} + todo.description`}>
            <td>{index+1}</td>
            <td>{editingId === todo.id ? <TodoEdit showModal={showModal} todo={todo} onSave={handleSaveClick} onCancel={handleCancelClick} /> : todo.title}</td>
            <td>{todo.description}</td>
            <td>{todo.completed ? 'Yes' : 'No'}</td>
            <td>
              <Button variant="primary" onClick={() => handleEditClick(todo.id)}>Edit</Button>{' '}
              <Button variant="danger" onClick={() => handleRemoveClick(todo.id)}>Remove</Button>
            </td>
          </tr>
        )})}
      </tbody>
    </Table>
  );
};

export default TodoList;
