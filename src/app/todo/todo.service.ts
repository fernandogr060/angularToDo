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
    return new Promise(resolve => {
      let data;

      if(query === 'completed' || query === 'active') {
        console.log(query);
        data = this.getActiveOrCompleted(query);
      } else {
        data = todos;
      }
      resolve(data)
    });
  }

  getActiveOrCompleted(query) {
      var isCompleted = query === 'completed';
      const data = todos.filter(todo => todo.isDone === isCompleted);

      return data;
  }

  add(newTodo) {
    return new Promise(resolve => {
      newTodo.id = todos.length;
      todos.push(newTodo);
      resolve(newTodo);
    });
  }

  completeTask(id, value) {
    return new Promise (resolve => {
      const index = todos.findIndex(todo => todo.id === id);
      todos[index].isDone = value;
      resolve(todos);
    })
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

  clearAll(){
    return new Promise(resolve => {
      todos = [];
      resolve(todos);
    });
  }
}
