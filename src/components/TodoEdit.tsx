import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { Todo } from '../types';

interface TodoEditProps {
  todo: Todo;
  onSave: (todo: Todo) => void;
  onCancel: () => void;
  showModal: boolean;
}

const TodoEdit: React.FC<TodoEditProps> = ({ todo, onSave, onCancel, showModal }) => {
  const [title, setTitle] = useState<string>(todo.title);
  const [description, setDescription] = useState<string>(todo.description);
  const [completed, setCompleted] = useState<boolean>(todo.completed);

  const handleSave = () => {
    const editedTodo: Todo = {
      ...todo,
      title: title,
      description: description,
      completed,
      editing: false,
    };

    onSave(editedTodo);
    onCancel();
  };

  return (
    <Modal show={showModal} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formTitle">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter title" value={description} onChange={e => setDescription(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formCompleted">
            <Form.Check type="checkbox" label="Completed" checked={completed} onChange={e => setCompleted(e.target.checked)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TodoEdit;
