import { Injectable } from '@angular/core';

interface Todo {
  id: number, 
  title: string, 
  isDone: boolean
}

let todos = [
  { id: 0, title: 'Install Angular CLI', isDone: true },
  { id: 1, title: 'Style app', isDone: true },
  { id: 2, title: 'Finish service functionality', isDone: false },
  { id: 3, title: 'Setup API', isDone: false },
  { id: 4, title: 'Break into components', isDone: false },
];


@Injectable()
export class TodoService {

  constructor() { }

  /**
   * Get Todos (all / completed / active)
   * @param {string} query
   ** @return {Promise<Array<Todo>>} 
   */
  get(query: string = ''): Promise<Array<Todo>> {
    return new Promise(resolve => resolve(this.getByQuery(query)));
  }

  /**
   * Add new Todo
   * @param {Todo} newTodo
   * @return {Promise<Todo>} 
   */
  add(newTodo: Todo): Promise<Todo> {
    return new Promise(resolve => {
      newTodo.id = todos.length;
      todos.push(newTodo);
      resolve(newTodo);
    });
  }

  /**
   * Update Todo
   * @param {Todo} data
   * @return {Promise<Todo>} 
   */
  update(data: Todo): Promise<Todo> {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === data.id);
      todos[index].title = data.title;
      resolve(data);
    });
  }

  /**
   * Delete Todo
   * @param {number} id
   * @return {Promise<Boolean>}  
   */
  destroy(id: number): Promise<Boolean> {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === id);
      todos.splice(index, 1);
      resolve(true);
    });
  }

  /**
   * Update isDone of a Todo
   * @param {number} id 
   * @param {string} value 
   * @return {Promise<Array<Todo>>}
   */
  completeTask(id: number, value: boolean): Promise<Array<Todo>> {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === id);
      todos[index].isDone = value;
      resolve(todos);
    });
  }

  /**
   * Get just the Active (!isDone) Todos
   * @param {string} query 
   * @return {Promise<Array<Todo>>}
   */
  clearAllCompleted(query: string): Promise<Array<Todo>> {
    return new Promise(resolve => {
      const tasks = this.getByQuery(query);
      const toBeDone = tasks.filter(todo => !todo.isDone);
      resolve(toBeDone);
    });
  }

  /**
   * get Todos based on query
   * @param {string} query 
   * @return {Array<Todo>}
   */
  getByQuery(query: string): Array<Todo> {
    let data;
    if (query === 'completed' || query === 'active') {
      data = this.getActiveOrCompleted(query);
    }
    else {
      data = todos;
    }
    return data;
  }

  /**
   * Get completed or Active Todos
   * @param {string} query
   * @return {Array<Todo>}
   */
  getActiveOrCompleted(query: string): Array<Todo> {
    var isCompleted = query === 'completed';
    const data = todos.filter(todo => todo.isDone === isCompleted);
    return data;
  }
}
