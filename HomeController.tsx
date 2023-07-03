import {Component} from 'react';

export interface Todo {
  id: number;
  text: string;
}

interface IProps {
  handleAddTodo: () => void;
  handleDelete: (id: number) => void;
  handleInputChange: (text: string) => void;
  hanldeUpdate: () => void;
  handleEdit: (item: Todo) => void;
  todoList: Todo[];
  task: string;
  tempId: null;
}

interface IState {}

export default class HomeController extends Component<IProps, IState> {}
