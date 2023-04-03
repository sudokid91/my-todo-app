import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoEdit from './components/TodoEdit';
import { Todo } from './types';
import axios from 'axios';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const fetchTodos = () => {
    axios.get('http://10.50.130.12:6868/api/todos').then(res => {
      const data: Todo[] = res?.data;
      setTodos(data);
    }).catch(err => {
      console.log(`error fetch data: `, {err})
    })
  }
 
  useEffect(() => {
    fetchTodos();
  }, [])

  const handleAddTodo = (newTodo: Todo) => {
    axios.post(`http://10.50.130.12:6868/api/todos`, {
      title: newTodo.title,
      description: newTodo.description,
      completed: newTodo.completed,
    }).then(res => {
      fetchTodos();
     }).catch(err => {
       console.log(`error fetch data: `, {err})
     })
  };

  const handleEditTodo = (editedTodo: Todo) => {
    setTodos(todos.map(todo => todo.id === editedTodo.id ? editedTodo : todo));
  };

  const handleRemoveTodo = (todoId: number) => {
    // setTodos(todos.filter(todo => todo.id !== todoId));
    axios.delete(`http://10.50.130.12:6868/api/todos/${todoId}`).then(res => {
     console.log(`deleted todo`);
     fetchTodos();
    }).catch(err => {
      console.log(`error fetch data: `, {err})
    })
  };

  const handleShowEditModal = (todo: Todo) => {
    console.log(`show edit modal: `, {todo})
    // setSelectedTodo(todo);
    axios.put(`http://10.50.130.12:6868/api/todos/${todo.id}`, {
      title: todo.title,
      description: todo?.description,
      completed: todo?.completed
    }).then(res => {
     console.log(`updated todo`);
     fetchTodos();
    }).catch(err => {
      console.log(`error fetch data: `, {err})
    })
    setShowModal(false);
  };

  const handleCloseModal = () => {
    // setSelectedTodo(null);
    setShowModal(false);
  };

  if (todos.length === 0) return <></>;

  return (
    <Container>
      <Row>
        <Col>
          <h1 className='text-center'>Todo List</h1>
          {todos.length > 0 ? <TodoList todos={todos} onEdit={handleShowEditModal} onRemove={handleRemoveTodo} /> : <></>}
        </Col>
      </Row>
      <Row>
          <TodoForm onAdd={handleAddTodo} />
      </Row>
      {selectedTodo &&
        <TodoEdit showModal={showModal} todo={selectedTodo} onSave={handleEditTodo} onCancel={handleCloseModal} />
      }
    </Container>
  );
};

export default App;
