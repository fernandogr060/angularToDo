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

  /**
   * @param {string} query
   */
  getTodos(query: string = '') {
    return this.todoService.get(query).then(todos => {
      this.todos = todos;
      this.activeTasks = this.tasksToBeDone();
    });
  }

  
  /**
   * @return {number} tasksLeft
   */
  tasksToBeDone(): number {
    const tasksLeft = this.todos.length - this.todos.filter(todo => todo.isDone).length;
    return tasksLeft;
  }

  addTodo() {
    this.todoService.add({id: null, title: this.newTodo, isDone: false }).then(() => {
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

  clearAllCompleted() {
    const query = this.path;
    this.todoService.clearAllCompleted(query).then((toBeDone) => {
      this.todos = toBeDone;
      return this.todos;
    });
  }
}