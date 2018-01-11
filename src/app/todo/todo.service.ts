import { Injectable } from '@angular/core';

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

  get(query = ''){
    return new Promise(resolve => resolve(this.getByQuery(query)));
  }

  add(newTodo) {
    return new Promise(resolve => {
      newTodo.id = todos.length;
      todos.push(newTodo);
      resolve(newTodo);
    });
  }

  update(data) {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === data.id);
      todos[index].title = data.title;
      resolve(data);
    })
  }

  destroy(id) {
    return new Promise(resolve => {
      const index = todos.findIndex(todo => todo.id === id);
      todos.splice(index, 1);
      resolve(true);
    });
  }

  completeTask(id, value) {
    return new Promise (resolve => {
      const index = todos.findIndex(todo => todo.id === id);
      todos[index].isDone = value;
      resolve(todos);
    })
  }

  clearAllCompleted(query){
    return new Promise(resolve => {
      const tasks = this.getByQuery(query);

      const toBeDone = tasks.filter(todo => !todo.isDone);
      resolve(toBeDone);
    });
  }

  getByQuery(query) {
    let data;

    if(query === 'completed' || query === 'active') {
      console.log(query);
      data = this.getActiveOrCompleted(query);
    } else {
      data = todos;
    }
    return data
  }

  getActiveOrCompleted(query) {
      var isCompleted = query === 'completed';
      const data = todos.filter(todo => todo.isDone === isCompleted);

      return data;
  }
}
