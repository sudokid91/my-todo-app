import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Todo } from '../types';

interface TodoFormProps {
  onAdd: (todo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) return;

    const newTodo: Todo = {
      id: Date.now(),
      title: title,
      description,
      completed,
      editing: false,
    };
    setTitle('');
    setDescription('');
    setCompleted(false);
    onAdd(newTodo);
    
  };

  return (
    <div className="todo-form"> {/* add className */}
      <h2 className='text-center'>Add New Todo</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
            <Col>
            <Form.Group controlId="formBasicName">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter title" onChange={e => setTitle(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicName">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter description" onChange={e => setDescription(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicName">
            <Form.Check type="checkbox" label="Completed" checked={completed} onChange={e => setCompleted(e.target.checked)} />
            </Form.Group>
          </Col>
        </Row>
          <Button variant="primary" type="submit">
            Add New
          </Button>
      </Form>
    </div>
  );
};

export default TodoForm;
