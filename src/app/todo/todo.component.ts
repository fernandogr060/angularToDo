import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {
  private todos;
  private activeTasks;
  private newTodo;
  private path;

  constructor(private todoService: TodoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.path = params['status'];
      this.getTodos(this.path);
    });
  }

  getTodos(query = '') {
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.tasksToBeDone()
    });
  }

  tasksToBeDone() {
    const tasksDone = this.todos.filter(todo => todo.isDone).length;

    return this.todos.length - tasksDone;
  }

  addTodo() {
    this.todoService.add({ title: this.newTodo, isDone: false }).then(() => {
      return this.getTodos();
    }).then(() => {
      this.newTodo = ''; // clear input form value
    });
  }

  completeTask(todo: { id: number; isDone: boolean }) {
    this.todoService.completeTask(todo.id, !todo.isDone).then(() => {
      return this.getTodos();
    });
  }

  updateTodo(todo, value) {
    console.log(value);
    todo.title = value;
    this.todoService.update(todo).then(() => {
      todo.editing = false;
      return this.getTodos();
    });
  }

  destroyTodo(todo) {
    this.todoService.destroy(todo.id).then(() => {
      return this.getTodos();
    });
  }

  clearAll() {
    this.todoService.clearAll().then(() => {
      return this.getTodos();
    });
  }
}